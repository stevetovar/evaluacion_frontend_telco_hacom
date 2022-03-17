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

    getBooks():Observable<Book[]> {
        return this.http.get<Book[]>(`${this.baseUrl}/book`);
    }

    addBook(book: Book):Observable<Book> {
        return this.http.post<Book>(`${this.baseUrl}/book`, book);
    }
}
