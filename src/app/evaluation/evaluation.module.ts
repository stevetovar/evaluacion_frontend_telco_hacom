import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationRoutingModule } from './evaluation-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookListComponent } from './pages/booklist/booklist.component';
import { BookComponent } from './pages/book/book.component';
import { AuthorComponent } from './pages/author/author.component';
import { BarDiagramComponent } from './components/bar-diagram/bar-diagram.component';
import { EchartComponent } from './components/echart/echart.component';
import { ContentComponent } from './components/content/content.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { LeftMenuComponent } from './components/leftmenu/leftmenu.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';

import { PrintbooleanPipe } from '../pipes/printboolean.pipe';
import { PrintyearPipe } from '../pipes/printyear.pipe';
import { AuthorDialogComponent } from './components/author-dialog/author-dialog.component';


@NgModule({
    declarations: [
        HomeComponent,
        BookComponent,
        BookListComponent,
        DashboardComponent,
        BarDiagramComponent,
        EchartComponent,
        ContentComponent,
        TopHeaderComponent,
        LeftMenuComponent,
        PrintbooleanPipe,
        PrintyearPipe,
        AuthorComponent,
        ConfirmDialogComponent,
        AuthorDialogComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        RouterModule,
        EvaluationRoutingModule,
        MaterialModule,
        SharedModule,
    ],
    providers: [
        {
            provide: MatPaginatorIntl,
            useClass: BookListComponent
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {floatLabel: 'always'} // always | never | auto
        }
    ]
})
export class EvaluationModule { }
