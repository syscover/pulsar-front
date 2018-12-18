import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { ActionDetailComponent } from './action/action-detail.component';
import { ActionListComponent } from './action/action-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { CategoryListComponent } from './category/category-list.component';
import { EmploymentOfficeListComponent } from './employment-office/employment-office-list.component';
import { EmploymentOfficeDetailComponent } from './employment-office/employment-office-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // EmploymentOffices
            { path: 'employment-office',                                    component: EmploymentOfficeListComponent },
            { path: 'employment-office/create',                             component: EmploymentOfficeDetailComponent,         data: { action: 'create' }},
            { path: 'employment-office/show/:id',                           component: EmploymentOfficeDetailComponent,         data: { action: 'edit' }},

            // Categories
            { path: 'category',                                             component: CategoryListComponent },
            { path: 'category/create',                                      component: CategoryDetailComponent,                 data: { action: 'create' }},
            { path: 'category/show/:id',                                    component: CategoryDetailComponent,                 data: { action: 'edit' }},

            // Categories
            { path: 'action',                                               component: ActionListComponent },
            { path: 'action/create',                                        component: ActionDetailComponent,                   data: { action: 'create' }},
            { path: 'action/show/:id',                                      component: ActionDetailComponent,                   data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ForemRoutingModule {}
