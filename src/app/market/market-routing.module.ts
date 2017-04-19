import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './../shared/components/main-layout/main-layout.component';
import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';

import { CategoryListComponent } from './categories/category-list.component';
import { CategoryDetailComponent } from './categories/category-detail.component';
import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';

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
                    { path: 'categories/create',                    component: CategoryDetailComponent,             data: { action: 'create' }},
                    { path: 'categories/create/:id/:lang/:newLang', component: CategoryDetailComponent,             data: { action: 'create-lang' }},
                    { path: 'categories/show/:id/:lang',            component: CategoryDetailComponent,             data: { action: 'edit' }},

                    // Customer Class
                    { path: 'customer-class-tax',                   component: CustomerClassTaxListComponent },
                    { path: 'customer-class-tax/create',            component: CustomerClassTaxDetailComponent,      data: { action: 'create' }},
                    { path: 'customer-class-tax/show/:id',          component: CustomerClassTaxDetailComponent,      data: { action: 'edit' }},

                    // Wildcard route
                    { path: '**',                                   component: ErrorComponent,                      data: { error: '404' }}
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
