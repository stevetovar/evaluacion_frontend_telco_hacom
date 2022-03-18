import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { environment } from '../../../environments/environment';
import { Book } from "../interfaces/book.interface";

@Injectable({
    providedIn: 'root',
})

export class BookService {
    private baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) {}

    getBooks(params: {} = {}): Observable<Book[]> {
        return this.http.get<Book[]>(`${this.baseUrl}/book`);
    }

    getBook(id: string): Observable<Book> {
        return this.http.get<Book>(`${this.baseUrl}/book/${id}`);
    }

    addBook(book: Book): Observable<Book> {
        return this.http.post<Book>(`${this.baseUrl}/book`, book);
    }

    updateBook(book: Book): Observable<Book> {
        return this.http.put<Book>(`${this.baseUrl}/book`, book);
    }

    deleteBook(id: string): Observable<Book> {
        return this.http.delete<Book>(`${this.baseUrl}/book`);
    }
}
