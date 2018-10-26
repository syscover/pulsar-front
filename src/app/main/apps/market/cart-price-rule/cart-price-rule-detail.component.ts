import { Component, Injector } from '@angular/core';
import { Params } from '@angular/router';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CartPriceRuleGraphQLService } from './cart-price-rule-graphql.service';
import { CustomerGroup } from './../../crm/crm.models';
import { DiscountType } from './../market.models';
import './../../../core/functions/date-to-json.function';

@Component({
    selector: 'dh2-cart-price-rule-detail',
    templateUrl: 'cart-price-rule-detail.component.html',
    animations: fuseAnimations
})
export class CartPriceRuleDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'MARKET.CART_PRICE_RULE';
    objectTranslationGender = 'F';
    baseUri = '/apps/market/marketing/cart-price-rule';
    name: string;
    customerGroups: CustomerGroup[] = [];
    discountTypes: DiscountType[] = [];
    amountDiscount = false;
    percentageDiscount = false;

    constructor(
        protected injector: Injector,
        protected graphQL: CartPriceRuleGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            description: null,
            active: false,
            customer_group_ids: [],
            combinable: false,
            priority: null,
            has_coupon: false,
            coupon_code: null,
            coupon_uses: null,
            customer_uses: null,
            total_uses: [{value: null, disabled: true}],
            enable_from: null,
            enable_to: null,
            discount_type_id: [null, Validators.required],
            discount_fixed_amount: null,
            discount_percentage: null,
            maximum_discount_amount: null,
            apply_shipping_amount: false,
            free_shipping: false
        });
    }

    argumentsRelationsObject(): Object
    {
        const configDiscountTypes = {
            key: 'pulsar-market.discount_types',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            configDiscountTypes
        };
    }

    // overwrite this method for not implement lang_id property in aguments
    // field object has translations in field name in json format
    getCustomArgumentsGetRecord(args: Object, params: Params): any
    {
        return Object.assign({}, {
            sql: [{
                command: 'where',
                column: 'market_cart_price_rule.id',
                operator: '=',
                value: params['id']
            }]},
            this.argumentsRelationsObject()
        );
    }

    afterSetData(): void
    {
        // show fields to fill discounts
        this.showDiscountTypeFields(this.object.discount_type_id);

        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') 
        {
            // set lang, this type of objects hasn't land_id in your table
            this.fg.patchValue({lang_id: this.lang.id});

            if (this.dataRoute.action === 'create-lang') 
            {
                this.name = this.object.names.find((el) => {
                    return el['id'] === this.baseLang;
                })['value'];

                // set name field
                this.fg.controls['name'].setValue(this.name);

                // set description field
                this.fg.controls['description'].setValue(
                    this.object.descriptions.find((el) => {
                        return el['id'] === this.baseLang;
                    })['value']
                );

                // disabled inputs that hasn't containt multi language
                this.disabledForm();
            } 
            else if (this.dataRoute.action === 'edit') 
            {
                this.name = this.object.names.find((el) => {
                    return el['id'] === this.lang.id;
                })['value'];

                // set name field
                this.fg.controls['name'].setValue(this.name);
                
                // set description field
                if (Array.isArray(this.object.descriptions))
                {
                    console.log(this.object.descriptions);
                    const trans = this.object.descriptions.find((el) => {
                        return el['id'] === this.lang.id;
                    });

                    if (trans && trans['id'])
                    {
                        this.fg.controls['description'].setValue(trans['id']);
                    }
                }

                // disabled elemetns if edit diferent language that base lang
                if (this.lang.id !== this.baseLang) this.disabledForm();
            }
        }
    } 

    disabledForm(): void
    {
        this.fg.controls['active'].disable();
        this.fg.controls['customer_group_ids'].disable();
        this.fg.controls['combinable'].disable();
        this.fg.controls['priority'].disable();
        this.fg.controls['has_coupon'].disable();
        this.fg.controls['coupon_code'].disable();
        this.fg.controls['coupon_uses'].disable();
        this.fg.controls['customer_uses'].disable();
        this.fg.controls['enable_from'].disable();
        this.fg.controls['enable_to'].disable();
        this.fg.controls['discount_type_id'].disable();
        this.fg.controls['discount_fixed_amount'].disable();
        this.fg.controls['discount_percentage'].disable();
        this.fg.controls['maximum_discount_amount'].disable();
        this.fg.controls['apply_shipping_amount'].disable();
        this.fg.controls['free_shipping'].disable();
    }

    setRelationsData(data: any): void
    {
        // set crm customer groups
        this.customerGroups = data.crmCustomerGroups;

        // set market discount types
        this.discountTypes = data.marketDiscountTypes;
    }

    handleDiscountType($event): void
    {
        this.showDiscountTypeFields($event.value);
    }

    private showDiscountTypeFields(value: number): void
    {
        if (value === 1)
        {
            this.percentageDiscount = false;
            this.amountDiscount = false;
        }
        
        if (value === 2 || value === 4)
        {
            this.percentageDiscount = true;
            this.amountDiscount = false;
        }

        if (value === 3 || value === 5)
        {
            this.amountDiscount = true;
            this.percentageDiscount = false;
        }
    }
}
