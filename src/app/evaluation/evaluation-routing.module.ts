import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BookComponent } from './pages/book/book.component';
import { BookListComponent } from './pages/booklist/booklist.component';
import { AuthorComponent } from './pages/author/author.component';
// import { ContentComponent } from './content/content.component';


const routes: Routes = [
    {
        path: '',
        // pathMatch: 'full',
        component: HomeComponent,
        children: [
            {
                path: 'books',
                component: BookListComponent,
            },
            {
                path: 'book/:id',
                component: BookComponent,
            },
            {
                path: 'book',
                component: BookComponent,
            },
            {
                path: 'author',
                component: AuthorComponent,
            },
            {
                path: 'dashboard',
                component: DashboardComponent,
            },
            {
                path: '**',
                redirectTo: 'dashboard',
            },
        ],
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class EvaluationRoutingModule { }
