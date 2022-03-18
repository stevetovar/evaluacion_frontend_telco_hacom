import { Component, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Author } from '../../interfaces/author.interface';
import { v4 as uuidv4 } from 'uuid';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-author-dialog',
    templateUrl: './author-dialog.component.html',
    styleUrls: ['./author-dialog.component.scss']
})

export class AuthorDialogComponent {
    constructor(
        private dialogRef: MatDialogRef<AuthorDialogComponent>,
    ) { }

    @ViewChild('miFormulario') form!: NgForm;
    author: Author = {
        id: uuidv4().replaceAll('-', ''),
        name: '',
        gender: '',
    }

    cancel() {
        this.dialogRef.close();
    }

    continue() {
        if (this.form.pending || this.form.invalid) this.form.control.markAllAsTouched;
        else this.dialogRef.close(this.author);
    }
}
