import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { CartPriceRuleGraphQLService } from './cart-price-rule-graphql.service';

@Component({
    selector: 'ps-cart-price-rule-list',
    templateUrl: './cart-price-rule-list.component.html'
})
export class CartPriceRuleListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'market_cart_price_rule.id'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: CartPriceRuleGraphQLService,
    ) {
        super(injector, graphQL);
    }
}
