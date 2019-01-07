import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '../../core/services/authorization.service';

import { ActionDetailComponent } from './action/action-detail.component';
import { ActionListComponent } from './action/action-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { CategoryListComponent } from './category/category-list.component';
import { EmploymentOfficeListComponent } from './employment-office/employment-office-list.component';
import { EmploymentOfficeDetailComponent } from './employment-office/employment-office-detail.component';
import { ExpedientDetailComponent } from './expedient/expedient-detail.component';
import { ExpedientListComponent } from './expedient/expedient-list.component';
import { GroupDetailComponent } from './group/group-detail.component';
import { GroupListComponent } from './group/group-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Actions
            { path: 'action',                                               component: ActionListComponent,                     data: { action: 'list' }},
            { path: 'action/create',                                        component: ActionDetailComponent,                   data: { action: 'create' }},
            { path: 'action/show/:id',                                      component: ActionDetailComponent,                   data: { action: 'edit' }},

            // Categories
            { path: 'category',                                             component: CategoryListComponent,                   data: { action: 'list' }},
            { path: 'category/create',                                      component: CategoryDetailComponent,                 data: { action: 'create' }},
            { path: 'category/show/:id',                                    component: CategoryDetailComponent,                 data: { action: 'edit' }},

            // EmploymentOffices
            { path: 'employment-office',                                    component: EmploymentOfficeListComponent,           data: { action: 'list' }},
            { path: 'employment-office/create',                             component: EmploymentOfficeDetailComponent,         data: { action: 'create' }},
            { path: 'employment-office/show/:id',                           component: EmploymentOfficeDetailComponent,         data: { action: 'edit' }},

            // Expedients
            { path: 'expedient',                                            component: ExpedientListComponent,                  data: { action: 'list' }},
            { path: 'expedient/create',                                     component: ExpedientDetailComponent,                data: { action: 'create' }},
            { path: 'expedient/show/:id',                                   component: ExpedientDetailComponent,                data: { action: 'edit' }},

            // Groups
            { path: 'group',                                                component: GroupListComponent,                      data: { action: 'list' }},
            { path: 'group/create',                                         component: GroupDetailComponent,                    data: { action: 'create' }},
            { path: 'group/show/:id',                                       component: GroupDetailComponent,                    data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ForemRoutingModule {}
