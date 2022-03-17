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
    ],
    // exports: [
    //     HomeComponent,
    //     BarDiagramComponent,
    //     EchartComponent,
    //     ContentComponent,
    //     MenuComponent,
    //     TopHeaderComponent,
    // ],
    imports: [
        CommonModule,
        FormsModule,
        FlexLayoutModule,
        RouterModule,
        EvaluationRoutingModule,
        MaterialModule,
        SharedModule,
    ]
})
export class EvaluationModule { }
