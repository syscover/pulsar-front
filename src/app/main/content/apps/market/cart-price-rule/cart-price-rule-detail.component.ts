import { Component, Injector } from '@angular/core';
import { Params } from '@angular/router';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CartPriceRuleGraphQLService } from './cart-price-rule-graphql.service';
import { CustomerGroup } from './../../crm/crm.models';
import * as _ from 'lodash';

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
    // discountTypes: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: CartPriceRuleGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            description: null,
            active: null,
            group_ids: [],
            combinable: null,
            priority: null,
            has_coupon: null,
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
            apply_shipping_amount: null,
            free_shipping: null
        });
    }

    argumentsRelationsObject(): Object
    {
        const configDiscountTypes = {
            key: 'pulsar-market.discountTypes',
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

    afterSetData() 
    {
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
                this.fg.controls['description'].setValue(
                    this.object.descriptions.find((el) => {
                        return el['id'] === this.lang.id;
                    })['value']
                );

                // disabled elemetns if edit diferent language that base lang
                if (this.lang.id !== this.baseLang) this.disabledForm();
            }
        }
    } 

    disabledForm() 
    {
        this.fg.controls['active'].disable();
        this.fg.controls['group_ids'].disable();
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

    /* 
    argumentsRelationsObject(): Object 
    {
        const configFieldTypes = {
            key: 'pulsar-admin.field_types'
        };

        const configDataTypes = {
            key: 'pulsar-admin.data_types'
        };

        const sqlFieldGroup = [
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_field_group.name'
            }
        ];

        return {
            configFieldTypes,
            configDataTypes,
            sqlFieldGroup
        };
    }

    // overwrite this method for not implement lang_id property in aguments
    // field object has translations in field name in json format
    getCustomArgumentsGetRecord(args: Object, params: Params): any 
    {
        return Object.assign({}, {
            sql: [{
                command: 'where',
                column: 'admin_field.id',
                operator: '=',
                value: params['id']
            }]},
            this.argumentsRelationsObject()
        );
    }

    setRelationsData(data: any) 
    {
        // set field groups
       // this.fieldGroups = data.adminFieldGroups;

        // set fields types
        //this.fieldTypes = data.coreConfigFieldTypes;

        // set data types
        //this.dataTypes = data.coreConfigDataTypes;
    } */
}
