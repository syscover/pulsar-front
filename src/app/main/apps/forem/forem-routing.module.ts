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
import { LocalityDetailComponent } from './locality/locality-detail.component';
import { LocalityListComponent } from './locality/locality-list.component';
import { ProvinceDetailComponent } from './province/province-detail.component';
import { ProvinceListComponent } from './province/province-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Actions
            { path: 'action',                                               component: ActionListComponent,                     data: { action: 'list', resource: 'forem-action' }},
            { path: 'action/create',                                        component: ActionDetailComponent,                   data: { action: 'create', resource: 'forem-action' }},
            { path: 'action/show/:id',                                      component: ActionDetailComponent,                   data: { action: 'edit', resource: 'forem-action' }},

            // Categories
            { path: 'category',                                             component: CategoryListComponent,                   data: { action: 'list', resource: 'forem-category' }},
            { path: 'category/create',                                      component: CategoryDetailComponent,                 data: { action: 'create', resource: 'forem-category' }},
            { path: 'category/show/:id',                                    component: CategoryDetailComponent,                 data: { action: 'edit', resource: 'forem-category' }},

            // EmploymentOffices
            { path: 'employment-office',                                    component: EmploymentOfficeListComponent,           data: { action: 'list', resource: 'forem-employment-office' }},
            { path: 'employment-office/create',                             component: EmploymentOfficeDetailComponent,         data: { action: 'create', resource: 'forem-employment-office' }},
            { path: 'employment-office/show/:id',                           component: EmploymentOfficeDetailComponent,         data: { action: 'edit', resource: 'forem-employment-office' }},

            // Expedients
            { path: 'expedient',                                            component: ExpedientListComponent,                  data: { action: 'list', resource: 'forem-expedient' }},
            { path: 'expedient/create',                                     component: ExpedientDetailComponent,                data: { action: 'create', resource: 'forem-expedient' }},
            { path: 'expedient/show/:id',                                   component: ExpedientDetailComponent,                data: { action: 'edit', resource: 'forem-expedient' }},

            // Groups
            { path: 'group',                                                component: GroupListComponent,                      data: { action: 'list', resource: 'forem-group' }},
            { path: 'group/create',                                         component: GroupDetailComponent,                    data: { action: 'create', resource: 'forem-group' }},
            { path: 'group/show/:id',                                       component: GroupDetailComponent,                    data: { action: 'edit', resource: 'forem-group' }},

            // Provinces
            { path: 'province',                                             component: ProvinceListComponent,                   data: { action: 'list', resource: 'forem-province' }},
            { path: 'province/create',                                      component: ProvinceDetailComponent,                 data: { action: 'create', resource: 'forem-province' }},
            { path: 'province/show/:id',                                    component: ProvinceDetailComponent,                 data: { action: 'edit', resource: 'forem-province' }},

            // Localities
            { path: 'locality',                                             component: LocalityListComponent,                   data: { action: 'list', resource: 'forem-locality' }},
            { path: 'locality/create',                                      component: LocalityDetailComponent,                 data: { action: 'create', resource: 'forem-locality' }},
            { path: 'locality/show/:id',                                    component: LocalityDetailComponent,                 data: { action: 'edit', resource: 'forem-locality' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ForemRoutingModule {}
