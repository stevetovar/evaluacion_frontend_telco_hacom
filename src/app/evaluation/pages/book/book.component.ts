import { map, tap } from 'rxjs/operators';
import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';

import { Author } from '../../interfaces/author.interface';
import { Book } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const defaultBook: Book = {
    id: undefined,
    title: undefined,
    description: undefined,
    year: undefined,
    idAuthor: undefined,
    author: undefined,
    published: undefined,
    registeredDate: undefined,
}

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
    searchAuthorText: string = '';
    selectedAuthor: Author | undefined;
    suggestedAuthors: Author[] = [];
    originalBook: Book = {...defaultBook};
    book: Book = {...defaultBook};
    author!: Author;
    editMode: boolean = false;

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
                if (!book) return;
                this.editMode = true;
                this.book = this.originalBook = book;
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

    @ViewChild('addAuthorButtonRef') addAuthorButtonRef!: ElementRef<HTMLButtonElement>;
    addAuthor(author: Author) {}

    addBook(book: Book) {
        const serviceName = this.book.id ? 'updateBook' : 'addBook';
        this.bookService[serviceName](book)
            .subscribe(resp => {
                if (!this.book.id) {
                    this.router.navigate(['/book/' + book.id]);
                    this.snackBar.open('Libro creado', 'Exitosamente', this.snackBarOption);
                } else {
                    this.snackBar.open('Libro editado', 'Exitosamente', this.snackBarOption);
                }
            })
    }

    @ViewChild('cancelButtonRef') cancelButtonRef!: ElementRef<HTMLButtonElement>;
    resetBook() {
        // const target: HTMLButtonElement = this.cancelButtonRef.nativeElement;
        this.book = this.originalBook;
    }
}
