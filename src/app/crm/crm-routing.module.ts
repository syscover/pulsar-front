import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './../shared/components/main-layout/main-layout.component';
import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';

import { GroupListComponent } from './groups/group-list.component';
import { GroupDetailComponent } from './groups/group-detail.component';

import * as config from './../core/app-globals';

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent,
        //canActivate: [AuthGuard],
        children: [
            {
                path: '',                                       component: DataContainerComponent,
                children: [

                    // Groups
                    { path: 'groups',                           component: GroupListComponent },
                    { path: 'groups/create',                    component: GroupDetailComponent,       data: { action: 'create' }},
                    { path: 'groups/show/:id',                  component: GroupDetailComponent,       data: { action: 'edit' }},

                    // Wildcard route
                    { path: '**',                               component: ErrorComponent,             data: { error: '404' }}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CrmRoutingModule {}
