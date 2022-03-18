import { tap } from 'rxjs/operators';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Author } from '../../interfaces/author.interface';
import { Book } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.services';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit {
    searchAuthorText: string = '';
    selectedAuthor: Author | undefined;
    suggestedAuthors: Author[] = [];
    book: Book;
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
    ) {
        this.book = {
            id: undefined,
            title: undefined,
            description: undefined,
            year: undefined,
            idAuthor: undefined,
            author: undefined,
            published: undefined,
            registeredDate: undefined,
        };
    }

    ngOnInit(): void {
        this.activedRoute.params
            .pipe(
                switchMap(({ id }) => this.bookService.getBook(id))
            ).subscribe(book => {
                if (!book) return;
                this.editMode = true;
                this.book = book;
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

    // @Output() resetBookEvent: EventEmitter<void> = new EventEmitter();

    resetBook() {
        this.book = {
            id: undefined,
            title: undefined,
            description: undefined,
            year: undefined,
            idAuthor: undefined,
            author: undefined,
            published: undefined,
            registeredDate: undefined,
        };
        //this.resetBookEvent.emit();
    }
}
