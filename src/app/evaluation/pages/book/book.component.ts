import { AuthorDialogComponent } from './../../components/author-dialog/author-dialog.component';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { Author } from '../../interfaces/author.interface';
import { Book } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PrintyearPipe } from 'src/app/pipes/printyear.pipe';

const defaultBook: Book = {
    id: undefined,
    title: undefined,
    description: undefined,
    year: undefined,
    idAuthor: undefined,
    author: {
        id: undefined,
        name: undefined,
        gender: undefined,
    },
    published: undefined,
    registeredDate: undefined,
}

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss'],
    providers: [ PrintyearPipe ]
})

export class BookComponent implements OnInit {
    searchAuthorText: string = '';
    selectedAuthor: Author | undefined;
    suggestedAuthors: Author[] = [];
    originalBook: Book = {...defaultBook};
    book: Book = {...defaultBook};
    author!: Author;

    editMode: boolean = false;
    formControl!: FormControl;
    minYear: number = 1455;
    maxYear: number = new Date().getFullYear();

    snackBarOption: MatSnackBarConfig = {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
    }

    constructor(
        private bookService: BookService,
        private activedRoute: ActivatedRoute,
        private router: Router,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private printyearPipe: PrintyearPipe,
    ) {}

    ngOnInit(): void {
        this.activedRoute.params
            .pipe(
                map(params => {
                    if (!params) return;
                    const { id } = params;
                    if (!id) return;
                    return id;
                }),
                switchMap(id => {
                    if (!id) return of();
                    return this.bookService.getBook(id);
                })
            ).subscribe(book => {
                book.year = Number(this.printyearPipe.transform(book.year));
                if (!book) return;
                this.editMode = true;
                this.originalBook = {...book};
                this.book = {...book};
                // console.log("🚀 ~ book", book)
            })
    }

    getSuggestedAuthor(query: string): Author[] {
        return [];
    }

    selectAuthor(ev: MatAutocompleteSelectedEvent) {
        const author: Author = ev.option.value;
        if (!author) {
            this.selectedAuthor = undefined;
            return;
        }
        const authorName: string = <string>author.name?.trim();
        const result: string = authorName || `No encontró resultados para ${authorName}`;
        this.searchAuthorText = result;
    }

    @ViewChild('miFormulario') form!: NgForm;

    // @ViewChild('addAuthorButtonRef') addAuthorButtonRef!: ElementRef<HTMLButtonElement>;
    addAuthor() {
        const dialog = this.dialog.open(AuthorDialogComponent, {
            width: '560px',
        });
        dialog.afterClosed()
            .subscribe(author => {
                if (!author) return;
                this.bookService.addAuthor(author)
                    .subscribe(author => {
                        this.book.author = author;
                    })
            })
    }

    submitForm() {
        const serviceName = this.book.id ? 'updateBook' : 'addBook';
        console.log("🚀 ~ serviceName", serviceName)
        this.bookService[serviceName](this.book)
            .subscribe(resp => {
                if (!this.book.id) {
                    this.router.navigate(['/app/book', resp.id]);
                    this.snackBar.open('Libro creado', 'Exitosamente', this.snackBarOption);
                } else {
                    this.snackBar.open('Libro editado', 'Exitosamente', this.snackBarOption);
                }
            })
    }

    // @ViewChild('cancelButtonRef') cancelButtonRef!: ElementRef<HTMLButtonElement>;
    resetBook() {
        console.log("🚀 ~ resetBook")
        // const target: HTMLButtonElement = this.cancelButtonRef.nativeElement;
        this.book = this.originalBook;
    }
}
