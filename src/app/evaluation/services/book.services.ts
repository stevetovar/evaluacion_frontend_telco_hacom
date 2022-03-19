import { map, switchMap } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";

import { environment } from '../../../environments/environment';
import { Author } from "../interfaces/author.interface";
import { Book } from "../interfaces/book.interface";

@Injectable({
    providedIn: 'root',
})

export class BookService {
    private baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) {}

    getBooks(params: {} = {}): Observable<Book[]> {
        console.log('getBooks')
        return this.http.get<Book[]>(`${this.baseUrl}/books`);
    }

    getBook(id: string): Observable<Book|undefined|null> {
        if (!id) return of();
        console.log('getBook')
        return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
    }

    addBook(book: Book): Observable<Book|undefined|null> {
        if (!book) return of();
        return this.http.post<Book>(`${this.baseUrl}/books`, book);
        // return this.http.get<Book>(`${this.baseUrl}/books/${book.id}`)
        //     .pipe(
        //         switchMap(book => {
        //             if (!book) return of();
        //             return this.http.post<Book>(`${this.baseUrl}/books`, book);
        //         }),
        //     )
    }

    updateBook(book: Book): Observable<Book|undefined|null> {
        if (!book) return of();
        console.log('updateBook',book)
        return this.http.put<Book>(`${this.baseUrl}/books/${book.id}`, book);
    }

    deleteBook(id: string): Observable<any|undefined|null> {
        if (!id) return of();
        console.log('deleteBook')
        return this.http.delete<Book>(`${this.baseUrl}/books/${id}`);
    }

    addAuthor(author: Author): Observable<Author> {
        if (!author) return of();
        console.log("🚀 ~ author", author)
        return this.http.get<Author>(`${this.baseUrl}/authors/${author.id}`)
            .pipe(
                switchMap(author => {
                    if (!author) return of();
                    return this.http.post<Author>(`${this.baseUrl}/books`, author);
                }),
            )
        // return this.http.post<Author>(`${this.baseUrl}/authors`, author);
    }
}
