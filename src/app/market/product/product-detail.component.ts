import { DynamicFormService } from './../../shared/components/dynamic-form/dynamic-form.service';
import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/primeng';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { ProductService } from './product.service';
import { Product, Category, ProductType, PriceType, ProductClassTax } from './../market.models';

// custom imports
import { CategoryService } from './../category/category.service';
import { ProductClassTaxService } from './../product-class-tax/product-class-tax.service';
import { TaxRuleService } from './../tax-rule/tax-rule.service';

import { FieldGroupService } from './../../admin/field-group/field-group.service';
import { FieldService } from './../../admin/field/field.service';
import { FieldGroup } from './../../admin/admin.models';

import * as _ from 'lodash';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'ps-product-detail',
    styles: [`
        .ui-tabview-panel{
            padding-top: 30px !important
        }
    `],
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent extends CoreDetailComponent implements OnInit {

    private categories: SelectItem[] = [];
    private productTypes: SelectItem[] = [];
    private priceTypes: SelectItem[] = [];
    private productClassTaxes: SelectItem[] = [];

    private fieldGroups: SelectItem[] = [];
    private fields: any;

    @ViewChild('productClassTax') private productClassTax;

    // paramenters for parent class
    private object: Product = new Product(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form, if the object not match with form, use pachValue instead of setvelue
            this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id')); // set categories extracting ids
            this.handleGetProductTaxes(this.fg.controls['subtotal'].value); // calculate tax prices
            if (this.object.field_group_id) { // get fields if object has field group
                this.handleGetFields(this.object.field_group_id);
                this.fg.patchValue(this.object.data.properties); // set values of custom fields
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: ProductService,
        protected confirmationService: ConfirmationService,
        protected categoryService: CategoryService,
        protected productClassTaxService: ProductClassTaxService,
        protected taxRuleService: TaxRuleService,

        // Custom fields
        protected fieldGroupService: FieldGroupService,
        protected fieldService: FieldService,
        private dynamicFormService: DynamicFormService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.createForm(); // create form

        // get categories
        this.categoryService.getRecords([this.configService.getConfig('base_lang')])
            .subscribe((response) => {
            this.categories = _.map(<Category[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            });
        });

        // get product types
        this.configService.getValue({
                key: 'pulsar.market.productTypes',
                translate: {
                    lang: this.configService.getConfig('base_lang'),
                    property: 'name'
                }
            }).subscribe((response) => {

                this.productTypes = _.map(<ProductType[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get types
                this.productTypes.unshift({ label: 'Select a product type', value: '' });
            });


        // get price types
        this.configService.getValue({
                key: 'pulsar.market.priceTypes',
                translate: {
                    lang: this.configService.getConfig('base_lang'),
                    property: 'name'
                }
            }).subscribe((response) => {

                this.priceTypes = _.map(<PriceType[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.priceTypes.unshift({ label: 'Select a price type', value: '' });
            });

        // get product class taxes
        this.productClassTaxService.getRecords()
            .subscribe((response) => {

            this.productClassTaxes = _.map(<ProductClassTax[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            });
            this.productClassTaxes.unshift({ label: 'Select a tax', value: '' });
        });

        // get field groups
        this.fieldGroupService.searchRecords({
                'type': 'query',
                'parameters': [
                    {
                        'command': 'where',
                        'column': 'field_group.resource_id',
                        'operator': '=',
                        'value': 'market-product'
                    }
                ]
            })
            .subscribe((response) => {

                this.fieldGroups = _.map(<FieldGroup[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get order status

                this.fieldGroups.unshift({ label: 'Select a field group', value: '' });
            });

        // get object
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            categories_id: [[], Validators.required],
            name: ['', Validators.required ],
            slug: ['', Validators.required ],
            field_group_id: '',
            product_type_id: ['', Validators.required],
            weight: [null, Validators.required],
            active: '',
            sort: [null, Validators.required],
            price_type_id: ['', Validators.required],
            product_class_tax_id: ['', Validators.required],
            description: '',
            size: '',
            price: null,
            subtotal: null,
            subtotal_format: [{value: null, disabled: true}, Validators.required ],
            tax_format: [{value: null, disabled: true}, Validators.required ],
            total_format: [{value: null, disabled: true}, Validators.required ]
        });

        // Save formGroup in service to use for dynamic form, custom fields
        this.dynamicFormService.form = this.fg;
    }

    handleGetProductTaxes(price = null) {

        this.taxRuleService.getProductTaxes({
                'type': 'query',
                'parameters': {
                    'price': price,
                    'productClassTax': this.fg.controls['product_class_tax_id'].value
                }
            })
            .subscribe(data => {
                this.fg.controls['subtotal'].setValue(data.data.subtotal);
                this.fg.controls['subtotal_format'].setValue(data.data.subtotalFormat);
                this.fg.controls['tax_format'].setValue(data.data.taxAmountFormat);
                this.fg.controls['total_format'].setValue(data.data.totalFormat);
            });
    }

    handleGetFields(field_group_id) {

        if (field_group_id !== '') {
            this.fieldService.searchRecords({
                'type': 'query',
                'parameters': [
                    {
                        'command': 'where',
                        'column': 'field.field_group_id',
                        'operator': '=',
                        'value': field_group_id
                    },
                    {
                        'command': 'orderBy',
                        'operator': 'asc',
                        'column': 'field.sort'
                    }
                ]
            }).subscribe(data => {
                this.fields = data.data;
            });
        } else {
            this.fields = undefined;
        }
    }
}
