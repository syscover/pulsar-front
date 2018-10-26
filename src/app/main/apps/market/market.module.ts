import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { MarketRoutingModule } from './market-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { CartPriceRuleListComponent } from './cart-price-rule/cart-price-rule-list.component';
import { CartPriceRuleDetailComponent } from './cart-price-rule/cart-price-rule-detail.component';
import { CategoryListComponent } from './category/category-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';
import { CustomerGroupCustomerClassTaxListComponent } from './customer-group-customer-class-tax/customer-group-customer-class-tax-list.component';
import { CustomerGroupCustomerClassTaxDetailComponent } from './customer-group-customer-class-tax/customer-group-customer-class-tax-detail.component';
import { OrderListComponent } from './order/order-list.component';
import { OrderDetailComponent } from './order/order-detail.component';
import { OrderRowInfoDialogComponent } from './order/order-row-info-dialog.component';
import { OrderStatusListComponent } from './order-status/order-status-list.component';
import { OrderStatusDetailComponent } from './order-status/order-status-detail.component';
import { PaymentMethodListComponent } from './payment-method/payment-method-list.component';
import { PaymentMethodDetailComponent } from './payment-method/payment-method-detail.component';
import { PaypalWebProfileListComponent } from './paypal-web-profile/paypal-web-profile-list.component';
import { PaypalWebProfileDetailComponent } from './paypal-web-profile/paypal-web-profile-detail.component';
import { ProductListComponent } from './product/product-list.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { ProductClassTaxListComponent } from './product-class-tax/product-class-tax-list.component';
import { ProductClassTaxDetailComponent } from './product-class-tax/product-class-tax-detail.component';
import { ProductStockDialogComponent } from './product/product-stock-dialog.component';
import { SectionListComponent } from './section/section-list.component';
import { SectionDetailComponent } from './section/section-detail.component';
import { TaxRateZoneListComponent } from './tax-rate-zone/tax-rate-zone-list.component';
import { TaxRateZoneDetailComponent } from './tax-rate-zone/tax-rate-zone-detail.component';
import { TaxRuleListComponent } from './tax-rule/tax-rule-list.component';
import { TaxRuleDetailComponent } from './tax-rule/tax-rule-detail.component';
import { WarehouseListComponent } from './warehouse/warehouse-list.component';
import { WarehouseDetailComponent } from './warehouse/warehouse-detail.component';

import { CartPriceRuleGraphQLService } from './cart-price-rule/cart-price-rule-graphql.service';
import { CategoryGraphQLService } from './category/category-graphql.service';
import { CustomerClassTaxGraphQLService } from './customer-class-tax/customer-class-tax-graphql.service';
import { CustomerGroupCustomerClassTaxGraphQLService } from './customer-group-customer-class-tax/customer-group-customer-class-tax-graphql.service';
import { OrderGraphQLService } from './order/order-graphql.service';
import { OrderStatusGraphQLService } from './order-status/order-status-graphql.service';
import { PaymentMethodGraphQLService } from './payment-method/payment-method-graphql.service';
import { PaypalWebProfileGraphqlService } from './paypal-web-profile/paypal-web-profile-graphql.service';
import { ProductGraphQLService } from './product/product-graphql.service';
import { ProductClassTaxGraphQLService } from './product-class-tax/product-class-tax-graphql.service';
import { SectionGraphQLService } from './section/section-graphql.service';
import { StockGraphQLService } from './stock/stock-graphql.service';
import { TaxRateZoneGraphQLService } from './tax-rate-zone/tax-rate-zone-graphql.service';
import { TaxRuleGraphQLService } from './tax-rule/tax-rule-graphql.service';
import { WarehouseGraphQLService } from './warehouse/warehouse-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        MarketRoutingModule
    ],
    exports: [ ],
    declarations: [
        CartPriceRuleListComponent,
        CartPriceRuleDetailComponent,
        CategoryListComponent,
        CategoryDetailComponent,
        CustomerClassTaxListComponent,
        CustomerClassTaxDetailComponent,
        CustomerGroupCustomerClassTaxListComponent,
        CustomerGroupCustomerClassTaxDetailComponent,
        OrderListComponent,
        OrderDetailComponent,
        OrderRowInfoDialogComponent,
        OrderStatusListComponent,
        OrderStatusDetailComponent,
        PaymentMethodListComponent,
        PaymentMethodDetailComponent,
        PaypalWebProfileListComponent,
        PaypalWebProfileDetailComponent,
        ProductListComponent,
        ProductDetailComponent,
        ProductClassTaxListComponent,
        ProductClassTaxDetailComponent,
        ProductStockDialogComponent,
        SectionListComponent,
        SectionDetailComponent,
        TaxRateZoneListComponent,
        TaxRateZoneDetailComponent,
        TaxRuleDetailComponent,
        TaxRuleListComponent,
        WarehouseListComponent,
        WarehouseDetailComponent
    ],
    providers: [
        CartPriceRuleGraphQLService,
        CategoryGraphQLService,
        CustomerClassTaxGraphQLService,
        CustomerGroupCustomerClassTaxGraphQLService,
        OrderGraphQLService,
        OrderStatusGraphQLService,
        PaymentMethodGraphQLService,
        PaypalWebProfileGraphqlService,
        ProductGraphQLService,
        ProductClassTaxGraphQLService,
        SectionGraphQLService,
        StockGraphQLService,
        TaxRateZoneGraphQLService,
        TaxRuleGraphQLService,
        WarehouseGraphQLService
    ],
    entryComponents: [
        ProductStockDialogComponent,
        OrderRowInfoDialogComponent
    ]
})

export class MarketModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
