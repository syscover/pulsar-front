import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { MarketRoutingModule } from './market-routing.module';

import { CategoryListComponent } from './categories/category-list.component';
import { CategoryDetailComponent } from './categories/category-detail.component';
import { CustomerClassTaxListComponent } from './customer-class-taxes/customer-class-tax-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-taxes/customer-class-tax-detail.component';
import { GroupCustomerClassTaxListComponent } from './group-customer-class-taxes/group-customer-class-tax-list.component';
import { GroupCustomerClassTaxDetailComponent } from './group-customer-class-taxes/group-customer-class-tax-detail.component';
import { TaxRateZoneListComponent } from './tax-rate-zone/tax-rate-zone-list.component';
import { TaxRateZoneDetailComponent } from './tax-rate-zone/tax-rate-zone-detail.component';
import { PaymentMethodListComponent } from './payment-method/payment-method-list.component';
import { PaymentMethodDetailComponent } from './payment-method/payment-method-detail.component';
import { OrderStatusListComponent } from './order-status/order-status-list.component';
import { OrderStatusDetailComponent } from './order-status/order-status-detail.component';
import { ProductClassTaxListComponent } from './product-class-tax/product-class-tax-list.component';
import { ProductClassTaxDetailComponent } from './product-class-tax/product-class-tax-detail.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';

import { GroupService } from './../crm/groups/group.service';
import { LangService } from './../admin/langs/lang.service';
import { CountryService } from './../admin/countries/country.service';
import { CategoryService } from './categories/category.service';
import { CustomerClassTaxService } from './customer-class-taxes/customer-class-tax.service';
import { GroupCustomerClassTaxService } from './group-customer-class-taxes/group-customer-class-tax.service';
import { TaxRateZoneService } from './tax-rate-zone/tax-rate-zone.service';
import { PaymentMethodService } from './payment-method/payment-method.service';
import { OrderStatusService } from './order-status/order-status.service';
import { ProductClassTaxService } from './product-class-tax/product-class-tax.service';
import { ProductService } from './product/product.service';

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
        TaxRateZoneListComponent,
        TaxRateZoneDetailComponent,
        GroupCustomerClassTaxListComponent,
        GroupCustomerClassTaxDetailComponent,
        PaymentMethodListComponent,
        PaymentMethodDetailComponent,
        OrderStatusListComponent,
        OrderStatusDetailComponent,
        ProductClassTaxListComponent,
        ProductClassTaxDetailComponent,
        ProductListComponent,
        ProductDetailComponent
    ],
    providers: [
        LangService,
        CountryService,
        CategoryService,
        CustomerClassTaxService,
        GroupCustomerClassTaxService,
        TaxRateZoneService,
        PaymentMethodService,
        OrderStatusService,
        ProductClassTaxService,
        OrderStatusService,
        ProductService,
        GroupService
    ]
})

export class MarketModule {
    constructor() {}
}
