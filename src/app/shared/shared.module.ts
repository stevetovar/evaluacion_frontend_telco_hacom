import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

// import { MaterialModule } from '../material/material.module';

import { ErrorPageComponent } from './error-page/error-page.component';

@NgModule({
    declarations: [
        ErrorPageComponent,
    ],
    exports: [
        ErrorPageComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ]
})

export class SharedModule { }