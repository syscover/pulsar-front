import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
//import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { CartPriceRuleGraphQLService } from './cart-price-rule-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { Group } from './../../crm/crm.models';
import { ProductType } from './../market.models';

import * as _ from 'lodash';

@Component({
    selector: 'ps-cart-price-rule-detail',
    templateUrl: 'cart-price-rule-detail.component.html'
})
export class CartPriceRuleDetailComponent extends CoreDetailComponent {

    groups: SelectItem[] = [];
    discountTypes: SelectItem[] = [];
     /*
    fieldTypes: SelectItem[] = [];
    dataTypes: SelectItem[] = []; */

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
            description: [null, Validators.required],
            active: [null, Validators.required],
            group_ids: [],
            combinable: [null, Validators.required],
            priority: [null, Validators.required],
            has_coupon: [null, Validators.required],
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
            apply_shipping_amount: [null, Validators.required],
            free_shipping: [null, Validators.required]
        });
    }

    /* setData(response?) {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response; // function to set custom data
            this.fg.patchValue(this.object); // set values of form

            // set lang, this type of objects hasn't land_id in your table
            this.fg.patchValue({lang_id: this.lang.id});

            if (this.dataRoute.action === 'create-lang') {

                // set label field
                this.fg.controls['label'].setValue(
                    this.object['labels'].find((el) => {
                        return el['id'] === this.baseLang
                    })['value']
                );

                // disabled inputs that hasn't caontaint multi language
                this.disabledForm();

            } else if (this.dataRoute.action === 'edit') {

                // set label field
                this.fg.controls['label'].setValue(
                    this.object['labels'].find((el) => {
                        return el['id'] === this.lang.id;
                    })['value']
                );

                // disabled elemetns if edit diferent language that base lang
                if (this.lang.id !== this.baseLang) {
                    this.disabledForm();
                }
            }
        }
    } */

   /*  disabledForm() {
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
    }

    // overwrite this method for not implement lang_id property in aguments
    // field object has translations in field name in json format
    getCustomArgumentsGetRecord(args: Object, params: Params): any {
        return Object.assign({}, {
            sql: [{
                command: 'where',
                column: 'admin_field.id',
                operator: '=',
                value: params['id']
            }]},
            this.argumentsRelationsObject()
        );
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
    }
    */

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
