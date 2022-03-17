import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Book } from "../interfaces/book.interface";
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})

export class BookService {
    private baseUrl: string = environment.baseUrl;
    constructor(private http: HttpClient) {}

    getBooks():Observable<Book[]> {
        return this.http.get<Book[]>(`${this.baseUrl}/book`);
    }
}
