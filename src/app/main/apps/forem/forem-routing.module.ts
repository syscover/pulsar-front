import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { EmploymentOfficeListComponent } from './employment-office/employment-office-list.component';
import { EmploymentOfficeDetailComponent } from './employment-office/employment-office-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // EmploymentOffices
            { path: 'employment-office',                                       component: EmploymentOfficeListComponent },
            { path: 'employment-office/create',                                component: EmploymentOfficeDetailComponent,              data: { action: 'create' }},
            { path: 'employment-office/show/:id',                              component: EmploymentOfficeDetailComponent,              data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ForemRoutingModule {}
