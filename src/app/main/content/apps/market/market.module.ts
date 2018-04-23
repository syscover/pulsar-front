import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from './../../../../../@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { MarketRoutingModule } from './market-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { OrderStatusListComponent } from './order-status/order-status-list.component';
import { OrderStatusDetailComponent } from './order-status/order-status-detail.component';
import { PaymentMethodListComponent } from './payment-method/payment-method-list.component';
import { PaymentMethodDetailComponent } from './payment-method/payment-method-detail.component';

import { OrderStatusGraphQLService } from './order-status/order-status-graphql.service';
import { PaymentMethodGraphQLService } from './payment-method/payment-method-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        MarketRoutingModule
    ],
    exports: [ ],
    declarations: [
        OrderStatusListComponent,
        OrderStatusDetailComponent,
        PaymentMethodListComponent,
        PaymentMethodDetailComponent
    ],
    providers: [
        OrderStatusGraphQLService,
        PaymentMethodGraphQLService
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
