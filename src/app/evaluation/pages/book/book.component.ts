import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

import { Book } from '../../interfaces/book.interface';

export interface BookTable extends Book {
    action: boolean | undefined;
}

@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent implements AfterViewInit {
    showAddBook: boolean = false;
    searchBookText: string = '';

    displayedColumns: string[] = ['id', 'title', 'description', 'year', 'author', 'published', 'action'];
    dataSource: MatTableDataSource<BookTable>;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor() {
        const books = Array.from({length: 2}, (_, k) => createEmptyRow());
        this.dataSource = new MatTableDataSource(books);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }
}

function createEmptyRow(): BookTable {
    return {
        id: undefined,
        title: undefined,
        description: undefined,
        year: undefined,
        idAuthor: undefined,
        author: undefined,
        published: undefined,
        registeredDate: undefined,
        action: undefined,
    };
}
