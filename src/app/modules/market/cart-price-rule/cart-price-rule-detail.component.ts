import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { CartPriceRuleGraphQLService } from './cart-price-rule-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { Group } from './../../crm/crm.models';
import { ProductType, CartPriceRurle } from './../market.models';

import * as _ from 'lodash';

@Component({
    selector: 'ps-cart-price-rule-detail',
    templateUrl: 'cart-price-rule-detail.component.html'
})
export class CartPriceRuleDetailComponent extends CoreDetailComponent {

    groups: SelectItem[] = [];
    discountTypes: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: CartPriceRuleGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
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
            total_uses: null,
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

    // overwrite this method for not implement lang_id property in aguments
    // field object has translations in field name in json format
    getCustomArgumentsGetRecord(args: Object, params: Params): any {
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

    beforePatchValueEdit() {
        // create copy object for change readonly properties
        const objectInput = Object.assign({}, this.object);

        // change publish and date format to Date, for calendar component
        if (this.object['enable_from']) objectInput['enable_from'] = new Date(this.object['enable_from']);
        if (this.object['enable_to']) objectInput['enable_to'] = new Date(this.object['enable_to']);

        // overwrite object with object cloned
        this.object = objectInput;
    }

    afterPatchValueEdit() {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            // set lang, this type of objects hasn't land_id in your table
            this.fg.patchValue({lang_id: this.lang.id});
        }

        if (this.dataRoute.action === 'create-lang') {

            // set name field
            this.fg.controls['name'].setValue(
                this.object['names'].find((el) => {
                    return el['id'] === this.baseLang;
                })['value']
            );
            // set description field
            this.fg.controls['description'].setValue(
                this.object['descriptions'].find((el) => {
                    return el['id'] === this.baseLang;
                })['value']
            );

            // disabled inputs that hasn't caontaint multi language
            //this.disabledForm();

        } else if (this.dataRoute.action === 'edit') {

            // set name field
            this.fg.controls['name'].setValue(
                this.object['names'].find((el) => {
                    return el['id'] === this.lang.id;
                })['value']
            );
            // set description field
            this.fg.controls['description'].setValue(
                this.object['descriptions'].find((el) => {
                    return el['id'] === this.lang.id;
                })['value']
            );

            // disabled elemetns if edit diferent language that base lang
            if (this.lang.id !== this.baseLang) {
              //  this.disabledForm();
            }
        }
    }

    /* disabledForm() {
        this.fg.controls['field_group_id'].disable();
        this.fg.controls['name'].disable();
        this.fg.controls['field_type_id'].disable();
        this.fg.controls['data_type_id'].disable();
        this.fg.controls['required'].disable();
        this.fg.controls['sort'].disable();
        this.fg.controls['max_length'].disable();
        this.fg.controls['pattern'].disable();
        this.fg.controls['label_class'].disable();
        this.fg.controls['component_class'].disable();
    } */


    /* argumentsRelationsObject(): Object {
        return {
            configFieldTypes: {
                key: 'pulsar-admin.field_types'
            },
            configDataTypes: {
                key: 'pulsar-admin.data_types'
            }
        };
    } */

    argumentsRelationsObject(): Object {
        const configDiscountTypes = {
            key: 'pulsar-market.discountTypes',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            configDiscountTypes
        };
    }

    setRelationsData(data: any) {
        // set field groups
        this.groups = _.map(<Group[]>data['crmGroups'], obj => {
            return { value: obj.id, label: obj.name };
        });

        // market discount types
        this.discountTypes = _.map(<ProductType[]>data['marketDiscountTypes'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.discountTypes.unshift({ label: 'Select a product type', value: '' });
    }
}
