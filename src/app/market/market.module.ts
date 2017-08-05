
import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { MarketRoutingModule } from './market-routing.module';

import { CategoryDetailComponent } from './category/category-detail.component';
import { CategoryGraphQLService } from './category/category-graphql.service';
import { CategoryListComponent } from './category/category-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';
import { CustomerClassTaxGraphQLService } from './customer-class-tax/customer-class-tax-graphql.service';
import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { GroupCustomerClassTaxDetailComponent } from './group-customer-class-tax/group-customer-class-tax-detail.component';
import { GroupCustomerClassTaxGraphQLService } from './group-customer-class-tax/group-customer-class-tax-graphql.service';
import { GroupCustomerClassTaxListComponent } from './group-customer-class-tax/group-customer-class-tax-list.component';
import { OrderStatusDetailComponent } from './order-status/order-status-detail.component';
import { OrderStatusGraphQLService } from './order-status/order-status-graphql.service';
import { OrderStatusListComponent } from './order-status/order-status-list.component';
import { PaymentMethodDetailComponent } from './payment-method/payment-method-detail.component';
import { PaymentMethodGraphQLService } from './payment-method/payment-method-graphql.service';
import { PaymentMethodListComponent } from './payment-method/payment-method-list.component';
import { ProductClassTaxDetailComponent } from './product-class-tax/product-class-tax-detail.component';
import { ProductClassTaxGraphQLService } from './product-class-tax/product-class-tax-graphql.service';
import { ProductClassTaxListComponent } from './product-class-tax/product-class-tax-list.component';
import { TaxRateZoneDetailComponent } from './tax-rate-zone/tax-rate-zone-detail.component';
import { TaxRateZoneGraphQLService } from './tax-rate-zone/tax-rate-zone-graphql.service';
import { TaxRateZoneListComponent } from './tax-rate-zone/tax-rate-zone-list.component';
import { TaxRuleDetailComponent } from './tax-rule/tax-rule-detail.component';
import { TaxRuleGraphQLService } from './tax-rule/tax-rule-graphql.service';
import { TaxRuleListComponent } from './tax-rule/tax-rule-list.component';

/*
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component'; */

@NgModule({
    imports: [
        SharedModule,
        MarketRoutingModule
    ],
    declarations: [
        CategoryDetailComponent,
        CategoryListComponent,
        CustomerClassTaxDetailComponent,
        CustomerClassTaxListComponent,
        GroupCustomerClassTaxDetailComponent,
        GroupCustomerClassTaxListComponent,
        PaymentMethodDetailComponent,
        PaymentMethodListComponent,
        OrderStatusDetailComponent,
        OrderStatusListComponent,
        ProductClassTaxDetailComponent,
        ProductClassTaxListComponent,
        TaxRateZoneDetailComponent,
        TaxRateZoneListComponent,
        TaxRuleDetailComponent,
        TaxRuleListComponent,
        /*
        ProductListComponent,
        ProductDetailComponent */
    ],
    providers: [
        CategoryGraphQLService,
        CustomerClassTaxGraphQLService,
        GroupCustomerClassTaxGraphQLService,
        OrderStatusGraphQLService,
        PaymentMethodGraphQLService,
        ProductClassTaxGraphQLService,
        TaxRateZoneGraphQLService,
        TaxRuleGraphQLService
    ]
})

export class MarketModule { }
