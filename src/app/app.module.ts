import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { EvaluationModule } from './evaluation/evaluation.module';
import { SharedModule } from './shared/shared.module';
import { StylePaginatorDirective } from './directives/style-paginator.directive';

@NgModule({
    declarations: [
        AppComponent,
        StylePaginatorDirective,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        EvaluationModule,
        SharedModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
