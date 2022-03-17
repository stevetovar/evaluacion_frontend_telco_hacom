import { Component, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import {MatSort, SortDirection} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { override } from 'joi';
import {merge, Observable, of as observableOf} from 'rxjs';
import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';

import { Book } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.services';
@Component({
    selector: 'app-book',
    templateUrl: './book.component.html',
    styleUrls: ['./book.component.scss']
})

export class BookComponent extends MatPaginatorIntl implements AfterViewInit {
    showAddBook: boolean = false;
    searchBookText: string = '';

    displayedColumns: string[] = ['id', 'title', 'description', 'year', 'author', 'published', 'action'];
    // getBooks!: Observable<Book[]> | null;
    // dataSource: MatTableDataSource<Book>;
    dataSource: Book[];

    dataSourceLength: number = 0;
    isLoadingResults: boolean = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(private bookService: BookService) {
        super();
        this.firstPageLabel = 'Primera página';
        this.lastPageLabel = 'Última página';
        this.itemsPerPageLabel = 'Por página';
        this.nextPageLabel = 'Siguiente';
        this.previousPageLabel = 'Anterior';
        // this.bookService.getBooks()
        //     .subscribe(resp => {
        //         console.log("🚀 ~ resp", resp);
        //         this.dataSourceLength = resp.length;
        //         this.dataSource = new MatTableDataSource(resp);
        //     }) ;
        this.dataSourceLength = 2;
        const newBooks = Array.from({length: this.dataSourceLength}, (_, k) => createEmptyRow());
        this.dataSource = newBooks;
        // this.dataSource = new MatTableDataSource(newBooks);
    }

    ngAfterViewInit() {
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;
        this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

        merge(this.sort.sortChange, this.paginator.page)
            .pipe(
                tap(() => this.isLoadingResults = true),
                startWith({}),
                switchMap(() => {
                    return this.bookService.getBooks()
                    // return this.getBooks({  // implement
                    //     this.sort.active,
                    //     this.sort.direction,
                    //     this.paginator.pageIndex,
                    // }).pipe(catchError(() => observableOf(null)));
                }),
                map(data => {
                    console.log("🚀 ~ data", data)
                    this.isLoadingResults = false;
                    if (!data) return [];
                    this.dataSourceLength = data.length;
                    return data;
                }),
            )
            .subscribe(data => (this.dataSource = data));
    }

    applySearchFilter(event: Event) {
        // const filterValue = (event.target as HTMLInputElement).value;
        // this.dataSource.filter = filterValue.trim().toLowerCase();

        // if (this.dataSource.paginator) {
        //     this.dataSource.paginator.firstPage();
        // }
    }
}

function createEmptyRow(): Book {
    return {
        id: undefined,
        title: undefined,
        description: undefined,
        year: undefined,
        idAuthor: undefined,
        author: undefined,
        published: undefined,
        registeredDate: undefined
    };
}
