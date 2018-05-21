import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { CartPriceRuleGraphQLService } from './cart-price-rule-graphql.service';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-cart-price-rule-list',
    templateUrl: './cart-price-rule-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class CartPriceRuleListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.CART_PRICE_RULE';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['market_cart_price_rule.id', 'market_cart_price_rule.names', 'market_cart_price_rule.coupon_code'];
    displayedColumns = ['market_cart_price_rule.id', 'market_cart_price_rule.names', 'market_cart_price_rule.coupon_code', 'market_cart_price_rule.active', 'translations', 'actions'];
    baseUri = '/apps/market/marketing/cart-price-rule';

    constructor(
        protected injector: Injector,
        protected graphQL: CartPriceRuleGraphQLService
    ) {
        super(injector, graphQL);
    }
}
