import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

// import { merge, Observable, ofasobservableOf, switchMap } from 'rxjs';
// import {catchError, map, startWith, switchMap, tap} from 'rxjs/operators';
// import { HttpParams } from '@angular/common/http';

import { BookService } from '../../services/book.services';
import { ConfirmDialogComponent } from './../../components/confirm-dialog/confirm-dialog.component';

import { Author } from '../../interfaces/author.interface';
import { IIndexable } from '../../interfaces/indexable.interface';
import { Book } from '../../interfaces/book.interface';

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

    snackBarOption: MatSnackBarConfig = {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 4000,
    }

    @ViewChild(MatTable) table!: MatTable<Author>;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(
        private bookService: BookService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
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

                this.dataSource.sortingDataAccessor = (book, property) => {
                    switch(property) {
                    case 'author': return book.author?.name ?? undefined;
                    default: return (book as IIndexable)[property];
                    }
                };
                // console.log("🚀 ~ this.dataSource", this.dataSource)
            });
    }

    ngAfterViewInit() {
    }

    applySearchFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
    }

    getBook(id: string) {
        if (!id.trim().length) return;
        this.bookService.getBook(id)
            .subscribe(resp => {
                console.log("🚀 ~ resp succesfull get", resp)
            })
    }

    removeBook(id: string, index: number) {
        if (!id.trim().length) return;
        if (Number.isNaN(index)) return;
        const dialog = this.dialog.open(ConfirmDialogComponent, {
            width: '360px',
            data: { id },
        });
        dialog.afterClosed()
            .subscribe(result => {
                if (!result) return;
                this.bookService.deleteBook(id)
                    .subscribe(resp => {
                        if (!this.dataSource.paginator) return;
                        this.dataSource.data = this.dataSource.data.splice(index, 1) && this.dataSource.data;
                        this.searchBookText = '';
                        this.snackBar.open('Libro eliminado', 'Exitosamente', this.snackBarOption);
                        this.dataSource.data = this.dataSource.data.splice(index, 1) && this.dataSource.data;
                        // this.table.renderRows();
                    })
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
}
