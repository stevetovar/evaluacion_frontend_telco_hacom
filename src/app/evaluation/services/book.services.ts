import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

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
        // console.log('getBooks')
        return this.http.get<Book[]>(`${this.baseUrl}/books`);
    }

    getBook(id: string): Observable<Book> {
        // console.log('getBook')
        return this.http.get<Book>(`${this.baseUrl}/books/${id}`);
    }

    addBook(book: Book): Observable<Book> {
        // console.log('addBook')
        return this.http.post<Book>(`${this.baseUrl}/books`, book);
    }

    updateBook(book: Book): Observable<Book> {
        // console.log('updateBook')
        return this.http.put<Book>(`${this.baseUrl}/books`, book);
    }

    deleteBook(id: string): Observable<any> {
        // console.log('deleteBook')
        return this.http.delete<Book>(`${this.baseUrl}/books/${id}`);
    }

    addAuthor(author: Author): Observable<Author> {
        // console.log('addAuthor')
        return this.http.post<Author>(`${this.baseUrl}/authors`, author);
    }
}
