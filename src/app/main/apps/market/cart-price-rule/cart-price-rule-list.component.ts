import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './cart-price-rule.graphql';

@Component({
    selector: 'dh2-market-cart-price-rule-list',
    templateUrl: './cart-price-rule-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class CartPriceRuleListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.CART_PRICE_RULE';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['market_cart_price_rule.id', 'market_cart_price_rule.names', 'market_cart_price_rule.coupon_code'];
    displayedColumns = ['market_cart_price_rule.id', 'market_cart_price_rule.names', 'market_cart_price_rule.coupon_code', 'market_cart_price_rule.total_uses', 'market_cart_price_rule.active', 'translations', 'actions'];
    baseUri = '/apps/market/marketing/cart-price-rule';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    // overwite method to get statuses
    getCustomArgumentsGetRecords(args: object): object
    {
        args['sql'].push({
            command: 'orderBy',
            operator: 'desc',
            column: 'market_cart_price_rule.id'
        });

        return args;
    }
}
