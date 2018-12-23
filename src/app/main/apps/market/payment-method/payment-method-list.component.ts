import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './payment-method.graphql';

@Component({
    selector: 'dh2-market-payment-method-list',
    templateUrl: './payment-method-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class PaymentMethodListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.PAYMENT_METHOD';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['market_payment_method.id', 'market_payment_method.name'];
    displayedColumns = ['market_payment_method.id', 'market_payment_method.name', 'market_payment_method.active', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
