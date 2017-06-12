import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';

import { AuthGuard } from './../core/auth/auth-guard.service';

import { FamilyListComponent } from './family/family-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',                                       component: DataContainerComponent,
                canActivateChild: [AuthGuard],
                children: [

                    // Articles
                    /*{ path: 'article',                              component: GroupListComponent },
                    { path: 'article/create',                       component: GroupDetailComponent,       data: { action: 'create' }},
                    { path: 'article/show/:id',                     component: GroupDetailComponent,       data: { action: 'edit' }},

                    // Categories
                    { path: 'category',                              component: GroupListComponent },
                    { path: 'category/create',                       component: GroupDetailComponent,       data: { action: 'create' }},
                    { path: 'category/show/:id',                     component: GroupDetailComponent,       data: { action: 'edit' }},

                    // Secions
                    { path: 'section',                              component: GroupListComponent },
                    { path: 'section/create',                       component: GroupDetailComponent,       data: { action: 'create' }},
                    { path: 'section/show/:id',                     component: GroupDetailComponent,       data: { action: 'edit' }},*/

                    // Articles families
                    { path: 'family',                               component: FamilyListComponent },
                    { path: 'family/create',                        component: FamilyDetailComponent,       data: { action: 'create' }},
                    { path: 'family/show/:id',                      component: FamilyDetailComponent,       data: { action: 'edit' }},

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

export class CmsRoutingModule {}
