import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorIntl} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatSort, SortDirection} from '@angular/material/sort';

// import {merge, Observable, of as observableOf} from 'rxjs';
// import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';
// import { HttpParams } from '@angular/common/http';

import { Book } from '../../interfaces/book.interface';
import { BookService } from '../../services/book.services';

@Component({
    selector: 'app-booklist',
    templateUrl: './booklist.component.html',
    styleUrls: ['./booklist.component.scss']
})

export class BookListComponent extends MatPaginatorIntl implements AfterViewInit {
    searchBookText: string = '';

    displayedColumns: string[] = ['id', 'title', 'description', 'year', 'author', 'published', 'action'];
    dataSource!: MatTableDataSource<Book>;
    // dataSource: Book[];

    pageSize: number = 5;
    dataSourceLength: number = 0;
    isLoadingResults: boolean = false;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private bookService: BookService,
        // private activedRoute: ActivatedRoute,
    ) {
        super();
        this.firstPageLabel = 'Primera página';
        this.lastPageLabel = 'Última página';
        this.itemsPerPageLabel = 'Por página';
        this.nextPageLabel = 'Siguiente';
        this.previousPageLabel = 'Anterior';
        this.dataSourceLength = 2;
        const newBooks = Array.from({length: this.dataSourceLength}, (_, k) => createEmptyRow());
        this.dataSource = new MatTableDataSource(newBooks);
        this.bookService.getBooks().
            subscribe(resp => {
                this.dataSource = new MatTableDataSource(resp);
                this.dataSourceLength = resp.length;
                this.dataSource.paginator = this.paginator;
                this.dataSource.sort = this.sort;
            });
    }

    ngAfterViewInit() {
        // console.log("🚀 ~ this.dataSource", this.dataSource)
        // this.dataSource.paginator = this.paginator;
        // this.dataSource.sort = this.sort;

        // this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
        // merge(this.sort.sortChange, this.paginator.page)
        //     .pipe(
        //         tap(() => this.isLoadingResults = true),
        //         startWith({}),
        //         switchMap(() => {
        //             const params = new HttpParams()
        //                 .set('sort_direction', 'down')
        //                 .set('query', this.searchBookText);
        //                 .set('limit', this.pageSize);
        //             return this.bookService.getBooks(params)
        //                 .pipe(catchError(() => observableOf(null)));
        //         }),
        //         map(data => {
        //             console.log("🚀 ~ data", data)
        //             this.isLoadingResults = false;
        //             if (!data) {
        //                 this.dataSourceLength = 2;
        //                 const newBooks = Array.from({length: this.dataSourceLength}, (_, k) => createEmptyRow());
        //                 return this.dataSource = newBooks;
        //             } else {
        //                 this.dataSourceLength = data.length;
        //                 return data;
        //             }
        //         }),
        //     )
        //     .subscribe(data => (this.dataSource = data));
    }

    applySearchFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    getBook(id: string) {
        this.bookService.getBook(id)
            .subscribe(resp => {
                console.log("🚀 ~ resp succesfull get", resp)
            })
    }

    removeBook(id: string) {
        this.bookService.deleteBook(id)
            .subscribe(resp => {
                console.log("🚀 ~ resp succesfull removed", resp)
            })
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
    // return {
    //     id: 'undefined',
    //     title: 'undefined',
    //     description: 'undefined',
    //     year: new Date(+(new Date()) - Math.floor(Math.random()*1000000000000)).getFullYear(),
    //     idAuthor: 'undefined',
    //     author: {
    //         name: 'undefined',
    //         id: 'nudefined',
    //         gender: 'undefined',
    //     },
    //     published: true,
    //     registeredDate: 'undefined'
    // };
}
