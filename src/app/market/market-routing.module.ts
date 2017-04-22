import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './../shared/components/main-layout/main-layout.component';
import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';

import { CategoryListComponent } from './categories/category-list.component';
import { CategoryDetailComponent } from './categories/category-detail.component';
import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';
import { GroupCustomerClassTaxListComponent } from './group-customer-class-tax/group-customer-class-tax-list.component';
import { GroupCustomerClassTaxDetailComponent } from './group-customer-class-tax/group-customer-class-tax-detail.component';
import { ProductClassTaxListComponent } from './product-class-tax/product-class-tax-list.component';
import { OrderStatusListComponent } from './order-status/order-status-list.component';
import { OrderStatusDetailComponent } from './order-status/order-status-detail.component';
import { ProductClassTaxDetailComponent } from './product-class-tax/product-class-tax-detail.component';
import { ProductListComponent } from './product/product-list.component';


import * as config from './../core/app-globals';

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent,
        //canActivate: [AuthGuard],
        children: [
            {
                path: '',                                           component: DataContainerComponent,
                children: [
                    // Categories
                    { path: 'categories',                           component: CategoryListComponent },
                    { path: 'categories/create',                    component: CategoryDetailComponent,                 data: { action: 'create' }},
                    { path: 'categories/create/:id/:lang/:newLang', component: CategoryDetailComponent,                 data: { action: 'create-lang' }},
                    { path: 'categories/show/:id/:lang',            component: CategoryDetailComponent,                 data: { action: 'edit' }},

                    // Customer Class Tax
                    { path: 'customer-class-tax',                   component: CustomerClassTaxListComponent },
                    { path: 'customer-class-tax/create',            component: CustomerClassTaxDetailComponent,         data: { action: 'create' }},
                    { path: 'customer-class-tax/show/:id',          component: CustomerClassTaxDetailComponent,         data: { action: 'edit' }},

                    // Group Customer Class Tax
                    { path: 'group-customer-class-tax',             component: GroupCustomerClassTaxListComponent },
                    { path: 'group-customer-class-tax/create',      component: GroupCustomerClassTaxDetailComponent,    data: { action: 'create' }},
                    { path: 'group-customer-class-tax/show/:id',    component: GroupCustomerClassTaxDetailComponent,    data: { action: 'edit' }},

                    // Product Class Tax
                    { path: 'product-class-tax',                    component: ProductClassTaxListComponent },
                    { path: 'product-class-tax/create',             component: ProductClassTaxDetailComponent,          data: { action: 'create' }},
                    { path: 'product-class-tax/show/:id',           component: ProductClassTaxDetailComponent,          data: { action: 'edit' }},

                    // Order Status
                    { path: 'order-status',                             component: OrderStatusListComponent },
                    { path: 'order-status/create',                      component: OrderStatusDetailComponent,      data: { action: 'create' }},
                    { path: 'order-status/create/:id/:lang/:newLang',   component: OrderStatusDetailComponent,      data: { action: 'create-lang' }},
                    { path: 'order-status/show/:id/:lang',              component: OrderStatusDetailComponent,      data: { action: 'edit' }},

                    // Products
                    { path: 'products',                             component: ProductListComponent },
                    { path: 'products/create',                      component: CategoryDetailComponent,                 data: { action: 'create' }},
                    { path: 'products/create/:id/:lang/:newLang',   component: CategoryDetailComponent,                 data: { action: 'create-lang' }},
                    { path: 'products/show/:id/:lang',              component: CategoryDetailComponent,                 data: { action: 'edit' }},

                    // Wildcard route
                    { path: '**',                                   component: ErrorComponent,                          data: { error: '404' }}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MarketRoutingModule {}
