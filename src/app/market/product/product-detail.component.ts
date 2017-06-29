import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ProductGraphQLService } from './product-graphql.service';

import { Product, Category, ProductType, PriceType, ProductClassTax } from './../market.models';

// custom imports
import { AttachmentFilesLibraryComponent } from './../../shared/components/forms/attachment-files-library/attachment-files-library/attachment-files-library.component';

import { DynamicFormService } from './../../shared/components/forms/dynamic-form/dynamic-form.service';



import { Field, FieldGroup, AttachmentFamily, FieldValue } from './../../admin/admin.models';

import * as _ from 'lodash';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'ps-product-detail',
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent extends CoreDetailComponent implements OnInit {

    categories: SelectItem[] = [];
    productTypes: SelectItem[] = [];
    priceTypes: SelectItem[] = [];
    productClassTaxes: SelectItem[] = [];
    attachmentFamilies: AttachmentFamily[] = [];
    products: SelectItem[] = [];

    // custom fields
    fieldGroups: SelectItem[] = [];
    fields: Field[];
    fieldValues: FieldValue[];

    @ViewChild('productClassTax') private productClassTax;
    @ViewChild('attachments') private attachments: AttachmentFilesLibraryComponent;

    // paramenters for parent class
    object: Product = new Product(); // set empty object
    customCallback: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form, if the object not match with form, use pachValue instead of setvelue
            // set attachments in FormArray from ps-attachment-files-library component
            this.attachments.setValue(this.object.attachments);
            this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id')); // set categories extracting ids

            this.handleGetProductTaxes(
                this.fg.controls['subtotal'].value,
                // callback, all http petition must to be sequential to pass JWT
                () => {
                    // get fields if object has field group
                    if (this.object.field_group_id) {
                        // set FormGroup with custom FormControls
                        this.handleGetCustomFields(this.object.data.properties);
                    }
                }
            ); // calculate tax prices

            if (this.dataRoute.action === 'create-lang') {
                this.fg.patchValue({
                    // set lang id in form from object with multiple language
                    lang_id: this.lang.id
                });
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected graphQL: ProductGraphQLService,
        // Custom fields
        private dynamicFormService: DynamicFormService
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {
        /*// get categories
        this.categoryService.getRecords([this.baseLang])
            .flatMap((response) => {
                this.categories = _.map(<Category[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });

                // return next observable
                return this.configService.getValue({
                    key: 'pulsar.market.productTypes',
                    translate: {
                        lang: this.baseLang,
                        property: 'name'
                    }
                });
            }).flatMap((response) => {
                // get product types
                this.productTypes = _.map(<ProductType[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get types
                this.productTypes.unshift({ label: 'Select a product type', value: '' });

                // return next observable
                return this.configService.getValue({
                    key: 'pulsar.market.priceTypes',
                    translate: {
                        lang: this.baseLang,
                        property: 'name'
                    }
                });
            }).flatMap((response) => {

                this.priceTypes = _.map(<PriceType[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.priceTypes.unshift({ label: 'Select a price type', value: '' });

                // return next observable
                return this.productClassTaxService.getRecords();
            }).flatMap((response) => {

                this.productClassTaxes = _.map(<ProductClassTax[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.productClassTaxes.unshift({ label: 'Select a tax', value: '' });

                // return next observable
                return  this.fieldGroupService.searchRecords({
                    'type': 'query',
                    'parameters': [
                        {
                            'command': 'where',
                            'column': 'field_group.resource_id',
                            'operator': '=',
                            'value': 'market-product'
                        }
                    ]
                });
            }).flatMap((response) => {

                this.fieldGroups = _.map(<FieldGroup[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.fieldGroups.unshift({ label: 'Select a field group', value: '' });

                // return next observable
                return this.attachmentFamilyService.searchRecords({
                    'type': 'query',
                    'parameters': [
                        {
                            'command': 'where',
                            'column': 'attachment_family.resource_id',
                            'operator': '=',
                            'value': 'market-product'
                        },
                        {
                            'command': 'orderBy',
                            'operator': 'asc',
                            'column': 'attachment_family.name'
                        }
                    ]
                });

            }).flatMap((response) => {
                this.attachmentFamilies = <AttachmentFamily[]>response.data;

                // load parent products
                let query = {
                    'type': 'query',
                    'parameters': [
                        {
                            'command': 'where',
                            'column': 'product_lang.lang_id',
                            'operator': '=',
                            'value': this.params['lang'] ? this.params['lang'] : this.baseLang
                        },
                        {
                            'command': 'orderBy',
                            'operator': 'asc',
                            'column': 'product.sort'
                        }
                    ]
                };

                // set id of product if action is edit
                if (this.params['id']) {
                    query.parameters.push({
                        'command': 'where',
                        'column': 'product.id',
                        'operator': '<>',
                        'value': this.params['id']
                    });
                };

                return this.objectService.searchRecords(query);
            }).subscribe((response) => {
                this.products = _.map(<Product[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get order status

                this.products.unshift({ label: 'Select a product', value: '' });

                super.init();
            });*/
    }

    // function call from parent
    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            code: '',
            categories_id: [[], Validators.required],
            name: ['', Validators.required ],
            slug: ['', Validators.required ],
            field_group_id: '',
            product_type_id: ['', Validators.required],
            parent_product_id: '',
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
            total_format: [{value: null, disabled: true}, Validators.required ],
            attachments: this.fb.array([])
        });
    }

    onSubmit(object: any, routeRedirect: string = undefined, params = []) {
        super.onSubmit(object, routeRedirect, params);
    }

    handleGetProductTaxes(price = null, callback = undefined) {
        /*let obs = this.taxRuleService.getProductTaxes({
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

                if (callback) {
                    callback();
                }
            });*/
    }

    // get custom fields that has this object
    handleGetCustomFields(properties = undefined) {
        if (this.fg.contains('field_group_id')) { // check that field_group_id exist
            this.dynamicFormService.instance(
                this.fg.get('field_group_id').value,
                this.fg,
                properties,
                (fields) => {
                    // get all values from all custom fields
                    /*this.fieldValueService.searchRecords({
                        'type': 'query',
                        'parameters': [
                            {
                                'command': 'whereIn',
                                'column': 'field_value.field_id',
                                'value': _.map(fields, 'id')
                            },
                            {
                                'command': 'where',
                                'column': 'field_value.lang_id',
                                'operator': '=',
                                'value': this.lang.id
                            },
                            {
                                'command': 'orderBy',
                                'operator': 'asc',
                                'column': 'field_value.sort'
                            }
                        ]
                    })
                    .subscribe((response) => {
                        this.fieldValues = response.data;
                        this.fields = fields;
                    });*/
                });
        }
    }
}
