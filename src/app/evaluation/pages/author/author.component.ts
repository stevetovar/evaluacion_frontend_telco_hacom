import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

import { Author } from '../../interfaces/author.interface';
import { Book } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.services';

@Component({
    selector: 'app-author',
    templateUrl: './author.component.html',
    styleUrls: ['./author.component.scss']
})

export class AuthorComponent implements OnInit {
    searchAuthorText: string = '';
    selectedAuthor: Author | undefined;
    suggestedAuthors: Author[] = [];
    book: Book;
    author!: Author;

    constructor(private bookService: BookService) {
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

    saveBook(ev: Event, book: Book) {
        // this.bookService.addBook(book)
        //     .subscribe(resp => { console.log('resp', resp) })
    }

    @Output() resetBookEvent: EventEmitter<void> = new EventEmitter();

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
        return this.resetBookEvent.emit();
    }
}
