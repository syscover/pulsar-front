import { Component, OnInit, Injector, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { ProductService } from './product.service';
import { Product, Category, ProductType, PriceType, ProductClassTax } from './../market.models';

// custom imports
import { CategoryService } from './../category/category.service';
import { ProductClassTaxService } from './../product-class-tax/product-class-tax.service';
import { TaxRuleService } from './../tax-rule/tax-rule.service';
import { SelectItem } from 'primeng/primeng';

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

    @ViewChild('productClassTax') private productClassTax;

    // paramenters for parent class
    private object: Product = new Product(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form, if the object not match with form, use pachValue instead of setvelue
            this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id')); // set categories extracting ids
            this.handleGetProductTaxes(this.fg.controls['subtotal'].value); // calculate tax prices
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: ProductService,
        protected confirmationService: ConfirmationService,
        protected categoryService: CategoryService,
        protected productClassTaxService: ProductClassTaxService,
        protected taxRuleService: TaxRuleService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.createForm(); // create form

        // get categories
        this.categoryService.getRecords(this.configService.getConfig('base_lang').id)
            .subscribe((response) => {

            this.categories = _.map(<Category[]>response.data, obj => {
                return { label: obj.name, value: obj.id };
            });
        });

        // get product types
        this.configService.getValue({
                key: 'pulsar.market.productTypes',
                translate: {
                    lang: this.configService.getConfig('base_lang').id,
                    property: 'name'
                }
            }).subscribe((response) => {

                this.productTypes = _.map(<ProductType[]>response.data, obj => {
                    return { label: obj.name, value: obj.id };
                }); // get types
                this.productTypes.unshift({ label: 'Select a product type', value: '' });
            });


        // get price types
        this.configService.getValue({
                key: 'pulsar.market.priceTypes',
                translate: {
                    lang: this.configService.getConfig('base_lang').id,
                    property: 'name'
                }
            }).subscribe((response) => {

                this.priceTypes = _.map(<PriceType[]>response.data, obj => {
                    return { label: obj.name, value: obj.id };
                });
                this.priceTypes.unshift({ label: 'Select a price type', value: '' });
            });

        // get product class taxes
        this.productClassTaxService.getRecords()
            .subscribe((response) => {

            this.productClassTaxes = _.map(<ProductClassTax[]>response.data, obj => {
                return { label: obj.name, value: obj.id };
            });
            this.productClassTaxes.unshift({ label: 'Select a tax', value: '' });
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
            product_type_id: ['', Validators.required],
            weight: null,
            active: '',
            sort: ['', Validators.required],
            price_type_id: ['', Validators.required],
            product_class_tax_id: ['', Validators.required],
            description: '',
            price: null,
            subtotal: null,
            subtotal_format: [{value: null, disabled: true}, Validators.required ],
            tax_format: [{value: null, disabled: true}, Validators.required ],
            total_format: [{value: null, disabled: true}, Validators.required ]
        });
    }

    handleGetProductTaxes(price = null) {
        const object = {
            'type': 'query',
            'parameters': {
                'price': price,
                'productClassTax': this.fg.controls['product_class_tax_id'].value
            }
        };

        this.taxRuleService.getProductTaxes(object)
            .subscribe(data => {
                this.fg.controls['subtotal'].setValue(data.data.subtotal);
                this.fg.controls['subtotal_format'].setValue(data.data.subtotalFormat);
                this.fg.controls['tax_format'].setValue(data.data.taxAmountFormat);
                this.fg.controls['total_format'].setValue(data.data.totalFormat);
            });

    }
}
