import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { MarketRoutingModule } from './market-routing.module';

import { CategoryListComponent } from './categories/category-list.component';
import { CategoryDetailComponent } from './categories/category-detail.component';
import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';
import { GroupCustomerClassTaxListComponent } from './group-customer-class-tax/group-customer-class-tax-list.component';
import { GroupCustomerClassTaxDetailComponent } from './group-customer-class-tax/group-customer-class-tax-detail.component';
import { ProductClassTaxListComponent } from './product-class-tax/product-class-tax-list.component';
import { ProductClassTaxDetailComponent } from './product-class-tax/product-class-tax-detail.component';

import { LangService } from './../admin/langs/lang.service';
import { CategoryService } from './categories/category.service';
import { CustomerClassTaxService } from './customer-class-tax/customer-class-tax.service';
import { GroupCustomerClassTaxService } from './group-customer-class-tax/group-customer-class-tax.service';
import { ProductClassTaxService } from './product-class-tax/product-class-tax.service';

@NgModule({
    imports: [
        SharedModule,
        MarketRoutingModule
    ],
    declarations: [
        CategoryListComponent,
        CategoryDetailComponent,
        CustomerClassTaxListComponent,
        CustomerClassTaxDetailComponent,
        GroupCustomerClassTaxListComponent,
        GroupCustomerClassTaxDetailComponent,
        ProductClassTaxListComponent,
        ProductClassTaxDetailComponent
    ],
    providers: [
        LangService,
        CategoryService,
        CustomerClassTaxService,
        GroupCustomerClassTaxService,
        ProductClassTaxService
    ]
})

export class MarketModule {
    constructor() {}
}
