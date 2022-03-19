import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Author } from '../../interfaces/author.interface';
import { NgForm } from '@angular/forms';
import { BookService } from '../../services/book.services';

const hash = require('object-hash');
// import { v4 as uuidv4 } from 'uuid';

export interface gender {
    id: string,
    label: string,
}

@Component({
    selector: 'app-author-dialog',
    templateUrl: './author-dialog.component.html',
    styleUrls: ['./author-dialog.component.scss']
})

export class AuthorDialogComponent {
    genders: gender[] = [
        {
            id: 'female',
            label: 'femenino',
        }, {
            id: 'male',
            label: 'masculino',
        }
    ]

    constructor(
        private dialogRef: MatDialogRef<AuthorDialogComponent>,
        private bookService: BookService,
    ) { }

    @ViewChild('miFormulario') form!: NgForm;
    author: Author = {
        id: undefined,
        name: undefined,
        gender: undefined,
    }

    cancel() {
        this.dialogRef.close();
    }

    continue() {
        const formattedName = this.author.name?.trim() || '';
        this.author.name = formattedName.length ? formattedName : undefined;
        if (this.form && (this.form.pending || this.form.invalid)) this.form.control.markAllAsTouched;
        else {
            this.author.id = hash(this.author.name);
            this.dialogRef.close(this.author);
        }
    }
}
