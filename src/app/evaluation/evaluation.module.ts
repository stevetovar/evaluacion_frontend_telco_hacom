import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvaluationRoutingModule } from './evaluation-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './pages/home/home.component';
import { AuthorComponent } from './pages/author/author.component';
import { BookComponent } from './pages/book/book.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BarDiagramComponent } from './components/bar-diagram/bar-diagram.component';
import { EchartComponent } from './components/echart/echart.component';
import { ContentComponent } from './components/content/content.component';
import { TopHeaderComponent } from './components/top-header/top-header.component';
import { MenuComponent } from './components/menu/menu.component';

import { PrintbooleanPipe } from '../pipes/printboolean.pipe';
import { PrintyearPipe } from '../pipes/printyear.pipe';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

@NgModule({
    declarations: [
        HomeComponent,
        AuthorComponent,
        BookComponent,
        DashboardComponent,
        BarDiagramComponent,
        EchartComponent,
        ContentComponent,
        TopHeaderComponent,
        MenuComponent,
        PrintbooleanPipe,
        PrintyearPipe,
    ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        RouterModule,
        EvaluationRoutingModule,
        MaterialModule,
        SharedModule,
        MatInputModule
    ],
    providers: [
        {
            provide: MatPaginatorIntl,
            useClass: BookComponent
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {floatLabel: 'always'} // always | never | auto
        }
    ]
})
export class EvaluationModule { }
