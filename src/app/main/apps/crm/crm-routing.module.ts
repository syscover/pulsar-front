import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '../../core/services/authorization.service';

import { AddressTypeListComponent } from './address-type/address-type-list.component';
import { AddressTypeDetailComponent } from './address-type/address-type-detail.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { CustomerGroupListComponent } from './customer-group/customer-group-list.component';
import { CustomerGroupDetailComponent } from './customer-group/customer-group-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Customers
            { path: 'customer',                         component: CustomerListComponent },
            { path: 'customer/create',                  component: CustomerDetailComponent,         data: { action: 'create' }},
            { path: 'customer/show/:id',                component: CustomerDetailComponent,         data: { action: 'edit' }},

            // Groups
            { path: 'customer-group',                   component: CustomerGroupListComponent },
            { path: 'customer-group/create',            component: CustomerGroupDetailComponent,    data: { action: 'create' }},
            { path: 'customer-group/show/:id',          component: CustomerGroupDetailComponent,    data: { action: 'edit' }},

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
