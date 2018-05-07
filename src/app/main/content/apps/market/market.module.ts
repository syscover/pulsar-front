import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from './../../../../../@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { MarketRoutingModule } from './market-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { CategoryListComponent } from './category/category-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { CustomerClassTaxListComponent } from './customer-class-tax/customer-class-tax-list.component';
import { CustomerClassTaxDetailComponent } from './customer-class-tax/customer-class-tax-detail.component';
import { OrderStatusListComponent } from './order-status/order-status-list.component';
import { OrderStatusDetailComponent } from './order-status/order-status-detail.component';
import { PaymentMethodListComponent } from './payment-method/payment-method-list.component';
import { PaymentMethodDetailComponent } from './payment-method/payment-method-detail.component';
import { ProductClassTaxListComponent } from './product-class-tax/product-class-tax-list.component';
import { ProductClassTaxDetailComponent } from './product-class-tax/product-class-tax-detail.component';
import { WarehouseListComponent } from './warehouse/warehouse-list.component';
import { WarehouseDetailComponent } from './warehouse/warehouse-detail.component';

import { CategoryGraphQLService } from './category/category-graphql.service';
import { CustomerClassTaxGraphQLService } from './customer-class-tax/customer-class-tax-graphql.service';
import { OrderStatusGraphQLService } from './order-status/order-status-graphql.service';
import { PaymentMethodGraphQLService } from './payment-method/payment-method-graphql.service';
import { ProductClassTaxGraphQLService } from './product-class-tax/product-class-tax-graphql.service';
import { WarehouseGraphQLService } from './warehouse/warehouse-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        MarketRoutingModule
    ],
    exports: [ ],
    declarations: [
        CategoryListComponent,
        CategoryDetailComponent,
        CustomerClassTaxListComponent,
        CustomerClassTaxDetailComponent,
        OrderStatusListComponent,
        OrderStatusDetailComponent,
        PaymentMethodListComponent,
        PaymentMethodDetailComponent,
        ProductClassTaxListComponent,
        ProductClassTaxDetailComponent,
        WarehouseListComponent,
        WarehouseDetailComponent
    ],
    providers: [
        CategoryGraphQLService,
        CustomerClassTaxGraphQLService,
        OrderStatusGraphQLService,
        PaymentMethodGraphQLService,
        ProductClassTaxGraphQLService,
        WarehouseGraphQLService
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
