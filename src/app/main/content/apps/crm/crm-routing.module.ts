import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { GroupListComponent } from './group/group-list.component';
import { GroupDetailComponent } from './group/group-detail.component';

/*
        // Customers
        { path: 'customer',                         component: CustomerListComponent },
        { path: 'customer/create',                  component: CustomerDetailComponent,     data: { action: 'create' }},
        { path: 'customer/show/:id',                component: CustomerDetailComponent,     data: { action: 'edit' }},

        // Types
        { path: 'type',                             component: TypeListComponent },
        { path: 'type/create',                      component: TypeDetailComponent,         data: { action: 'create' }},
        { path: 'type/show/:id',                    component: TypeDetailComponent,         data: { action: 'edit' }},
            
*/

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Groups
            { path: 'group',                            component: GroupListComponent },
            { path: 'group/create',                     component: GroupDetailComponent,        data: { action: 'create' }},
            { path: 'group/show/:id',                   component: GroupDetailComponent,        data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CrmRoutingModule {}
