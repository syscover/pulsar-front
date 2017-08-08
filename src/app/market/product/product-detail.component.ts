import { Component, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ProductGraphQLService } from './product-graphql.service';
import { Product, Category, ProductType, PriceType, ProductClassTax } from './../market.models';
import { AttachmentFilesLibraryComponent } from './../../shared/components/forms/attachment-files-library/attachment-files-library/attachment-files-library.component';
import { DynamicFormService } from './../../shared/components/forms/dynamic-form/dynamic-form.service';
import { Field, FieldGroup, AttachmentFamily, FieldValue } from './../../admin/admin.models';
import { environment } from './../../../environments/environment';
import * as _ from 'lodash';
import gql from 'graphql-tag';

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'ps-product-detail',
    templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent extends CoreDetailComponent {

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

    constructor(
        protected injector: Injector,
        protected graphQL: ProductGraphQLService,
        private dynamicFormService: DynamicFormService
    ) {
        super(injector, graphQL);
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

    postRecord(object: any, routeRedirect: string = undefined, params = []) {
        super.postRecord(object, routeRedirect, params);
    }

    handleGetProductTaxes(price = null, callback = undefined) {
         let subs = this.objectService
            .proxyGraphQL()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: gql`
                    query MarketProductTaxes ($price:Float! $productClassTax:Int) {
                        marketProductTaxes (price:$price productClassTax:$productClassTax)
                    }
                `,
                variables: {
                    price: price,
                    productClassTax: this.fg.controls['product_class_tax_id'].value
                }
            })
            .subscribe(({data}) => {
                subs.unsubscribe();
                if (environment.debug) console.log('DEBUG - response of marketProductTaxes query: ', data);

                this.fg.controls['subtotal'].setValue(data['marketProductTaxes']['subtotal']);
                this.fg.controls['subtotal_format'].setValue(data['marketProductTaxes']['subtotalFormat']);
                this.fg.controls['tax_format'].setValue(data['marketProductTaxes']['taxAmountFormat']);
                this.fg.controls['total_format'].setValue(data['marketProductTaxes']['totalFormat']);

                if (callback) callback();
            });
    }

    // get custom fields that has this object
    handleGetCustomFields() {
        if (this.fg.contains('field_group_id')) { // check that field_group_id exist

            // get properties for get values of custom fields
            let customFields = this.object.data && this.object.data.customFields ? this.object.data.customFields : undefined;

            this.dynamicFormService.instance(
                this.fg.get('field_group_id').value,
                this.fg,
                customFields,
                (fields) => {
                    this.fields = fields;
                });
        }
    }

    setData (response = undefined) {
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
                        this.handleGetCustomFields();
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

    argumentsRelationsObject(): Object {
        let sqlArticle = [
            {
                command: 'where',
                column: 'article.lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'article.name'
            }
        ];

        // set id of product if action is edit
        if (this.params['id']) {
            sqlArticle.push({
                command: 'where',
                column: 'article.id',
                operator: '<>',
                value: this.params['id']
            });
        };

        let sqlCategory = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            }
        ];

        let sqlAttachmentFamily = [
            {
                'command': 'where',
                'column': 'attachment_family.resource_id',
                'operator': '=',
                'value': 'cms-article'
            },
            {
                'command': 'orderBy',
                'operator': 'asc',
                'column': 'attachment_family.name'
            }
        ];

        let sqlProduct = [
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
        ];

        if (this.params['id']) {
            sqlProduct.push({
                command: 'where',
                column: 'product.id',
                operator: '<>',
                value: this.params['id']
            });
        };

        let sqlFieldGroup = [
            {
                command: 'where',
                column: 'resource_id',
                operator: '=',
                value: 'market-product'
            }
        ];

        let configProductTypes = {
            key: 'pulsar.market.productTypes',
            lang: this.baseLang,
            property: 'name'
        };

        let configPriceTypes = {
            key: 'pulsar.market.priceTypes',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            sqlCategory,
            sqlAttachmentFamily,
            sqlProduct,
            sqlFieldGroup,
            configProductTypes,
            configPriceTypes
        };
    }

    setRelationsData(data) {
        // market categories
        this.categories = _.map(<Category[]>data['marketCategories'], obj => {
            return { value: obj.id, label: obj.name };
        });

        // market product class tax
        this.productClassTaxes = _.map(<ProductType[]>data['marketProductClassTaxes'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.productClassTaxes.unshift({ label: 'Select a product class tax', value: '' });

        // market product types
        this.productTypes = _.map(<ProductType[]>data['marketProductTypes'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.productTypes.unshift({ label: 'Select a product type', value: '' });

        // market price types
        this.priceTypes = _.map(<PriceType[]>data['marketPriceTypes'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.priceTypes.unshift({ label: 'Select a price type', value: '' });

        // market field groups
        this.fieldGroups = _.map(<PriceType[]>data['adminFieldGroups'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.fieldGroups.unshift({ label: 'Select a field group', value: '' });

        // market products
        this.products = _.map(<PriceType[]>data['marketProducts'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.products.unshift({ label: 'Select a product', value: '' });

        // admin attachment families
        this.attachmentFamilies = <AttachmentFamily[]>data['adminAttachmentFamilies'];
    }
}
