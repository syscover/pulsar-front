import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { AddressTypeListComponent } from './address-type/address-type-list.component';
import { AddressTypeDetailComponent } from './address-type/address-type-detail.component';
import { GroupListComponent } from './group/group-list.component';
import { GroupDetailComponent } from './group/group-detail.component';

/*
        // Customers
        { path: 'customer',                         component: CustomerListComponent },
        { path: 'customer/create',                  component: CustomerDetailComponent,     data: { action: 'create' }},
        { path: 'customer/show/:id',                component: CustomerDetailComponent,     data: { action: 'edit' }},    
*/

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Groups
            { path: 'group',                            component: GroupListComponent },
            { path: 'group/create',                     component: GroupDetailComponent,            data: { action: 'create' }},
            { path: 'group/show/:id',                   component: GroupDetailComponent,            data: { action: 'edit' }},

            // Address Types
            { path: 'address-type',                     component: AddressTypeListComponent },
            { path: 'address-type/create',              component: AddressTypeDetailComponent,      data: { action: 'create' }},
            { path: 'address-type/show/:id',            component: AddressTypeDetailComponent,      data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CrmRoutingModule {}
