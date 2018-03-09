import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseError404Component } from './error-404.component';

const routes = [
    {
        path     : 'errors/error-404',
        component: FuseError404Component
    }
];

@NgModule({
    declarations: [
        FuseError404Component
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class Error404Module
{

}
