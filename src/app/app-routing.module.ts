import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: 'app',
    //     pathMatch: 'full',
    // },
    {
        path: 'app',
        loadChildren: () => import('./evaluation/evaluation.module').then(module => module.EvaluationModule),
    },
    {
        path: '404',
        component: ErrorPageComponent,
    },
    {
        path: '**',
        redirectTo: 'app',
        // redirectTo: '404',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
