import { NgModule } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { RouterModule } from '@angular/router';

import { FuseError500Component } from './error-500.component';

const routes = [
    {
        path     : 'errors/error-500',
        component: FuseError500Component
    }
];

@NgModule({
    declarations: [
        FuseError500Component
    ],
    imports     : [
        SharedModule,
        RouterModule.forChild(routes)
    ]
})

export class Error500Module
{

}
