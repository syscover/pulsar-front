import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/primeng';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { ProductService } from './product.service';
import { Product, Category, ProductType, PriceType, ProductClassTax } from './../market.models';

// custom imports
import { AttachmentFilesLibraryComponent } from './../../shared/components/forms/attachment-files-library/attachment-files-library/attachment-files-library.component';
import { CategoryService } from './../category/category.service';
import { ProductClassTaxService } from './../product-class-tax/product-class-tax.service';
import { TaxRuleService } from './../tax-rule/tax-rule.service';
import { AttachmentFamilyService } from './../../admin/attachment-family/attachment-family.service';
import { DynamicFormService } from './../../shared/components/dynamic-form/dynamic-form.service';

import { FieldGroupService } from './../../admin/field-group/field-group.service';
import { FieldService } from './../../admin/field/field.service';
import { FieldGroup, AttachmentFamily } from './../../admin/admin.models';

import * as _ from 'lodash';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'ps-product-detail',
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent extends CoreDetailComponent implements OnInit {

    private categories: SelectItem[] = [];
    private productTypes: SelectItem[] = [];
    private priceTypes: SelectItem[] = [];
    private productClassTaxes: SelectItem[] = [];
    private attachmentFamilies: AttachmentFamily[] = [];
    private products: SelectItem[] = [];

    private fieldGroups: SelectItem[] = [];
    private fields: any;

    @ViewChild('productClassTax') private productClassTax;
    @ViewChild('attachments') private attachments: AttachmentFilesLibraryComponent;

    // paramenters for parent class
    private object: Product = new Product(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form, if the object not match with form, use pachValue instead of setvelue
            // set attachments in FormArray from ps-attachment-files-library component
            this.attachments.setValue(this.object.attachments);
            this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id')); // set categories extracting ids
            this.handleGetProductTaxes(this.fg.controls['subtotal'].value); // calculate tax prices

            // get fields if object has field group
            if (this.object.field_group_id) {
                // set FormGroup with custom FormControls
                this.handleGetFields(this.object.data.properties);
            }

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
        protected objectService: ProductService,
        protected confirmationService: ConfirmationService,
        protected categoryService: CategoryService,
        protected productClassTaxService: ProductClassTaxService,
        protected taxRuleService: TaxRuleService,

        // Custom fields
        private dynamicFormService: DynamicFormService,
        protected fieldGroupService: FieldGroupService,
        protected fieldService: FieldService,
        private attachmentFamilyService: AttachmentFamilyService,
        private productService: ProductService
    ) {
        super(injector);
    }

    ngOnInit() {
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

        // load attachment families
        this.attachmentFamilyService.searchRecords({
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
            })
            .subscribe((response) => {
                this.attachmentFamilies = <AttachmentFamily[]>response.data;
            });

        // load parent products
        let query = {
            'type': 'query',
            'parameters': [
                {
                    'command': 'where',
                    'column': 'product_lang.lang_id',
                    'operator': '=',
                    'value': this.params['lang'] ? this.params['lang'] : this.configService.getConfig('base_lang')
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
        }

        this.productService.searchRecords(query)
            .subscribe((response) => {
                this.products = _.map(<Product[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get order status

                this.products.unshift({ label: 'Select a product', value: '' });
            });

        // get object
        super.getRecordHasIdParamenter(this.f);
    }

    // function call from parent
    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
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

    onSubmit(fg: FormGroup, object: any, routeRedirect: string = undefined, params = []) {
        super.onSubmit(fg, object, routeRedirect, params);
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

    // get custom fields that has this object
    handleGetFields(properties = undefined) {
        this.dynamicFormService.instance(
            this.fg,
            properties,
            (fields) => {
                this.fields = fields;
            });
    }
}
