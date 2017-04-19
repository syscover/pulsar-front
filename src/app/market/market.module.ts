import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { MarketRoutingModule } from './market-routing.module';

import { CategoryListComponent } from './categories/category-list.component';
import { CategoryDetailComponent } from './categories/category-detail.component';
import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';

import { LangService } from './../admin/langs/lang.service';
import { CategoryService } from './categories/category.service';
import { CustomerClassTaxService } from './customer-class-tax/customer-class-tax.service';

@NgModule({
    imports: [
        SharedModule,
        MarketRoutingModule
    ],
    declarations: [
        CategoryListComponent,
        CategoryDetailComponent,
        CustomerClassTaxListComponent,
        CustomerClassTaxDetailComponent
    ],
    providers: [
        LangService,
        CategoryService,
        CustomerClassTaxService
    ]
})

export class MarketModule {
    constructor() {}
}
