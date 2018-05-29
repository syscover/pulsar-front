import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ProductGraphQLService } from './product-graphql.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DynamicFormService } from './../../../core/components/dynamic-form/dynamic-form.service';
import { Product, ProductType, PriceType, ProductClassTax, Category } from './../market.models';
import { FieldGroup, AttachmentFamily } from './../../admin/admin.models';
import * as _ from 'lodash';
import gql from 'graphql-tag';

@Component({
    selector: 'dh2-product-detail',
    templateUrl: './product-detail.component.html',
    animations: fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/perfect-scroll-bar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.PRODUCT';
    objectTranslationGender = 'M';
    productTypes: ProductType[] = [];
    priceTypes: PriceType[] = [];
    productClassTaxes: ProductClassTax[] = [];
    categories: Category[] = [];
    products: Product[] = [];
    fieldGroups: FieldGroup[] = [];
    attachmentFamilies: AttachmentFamily[] = [];
    loadingPrice = false;

    imageStyles: Object = new Object;    

    constructor(
        protected injector: Injector,
        protected graphQL: ProductGraphQLService,
        private authenticationService: AuthenticationService
    ) {
        super(injector, graphQL);
    }
    
    createForm() {
        this.fg = this.fb.group({
            ix: null,
            id: null,
            lang_id: [null, Validators.required],
            code: null,
            categories_id: [[], Validators.required],
            name: [null, Validators.required],
            slug: [null, Validators.required],
            field_group_id: null,
            type_id: [null, Validators.required],
            parent_id: null,
            weight: [null, Validators.required],
            active: false,
            sort: [null, Validators.required],
            price_type_id: [null, Validators.required],
            product_class_tax_id: [null, Validators.required],
            description: null,
            price: null,
            subtotal: null,
            subtotal_format: [{value: null, disabled: true}, Validators.required],
            tax_format: [{value: null, disabled: true}, Validators.required],
            total_format: [{value: null, disabled: true}, Validators.required],
            attachments: this.fb.array([])
        });
    }
    
    argumentsRelationsObject(): Object 
    {
        const sqlCategory = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            }
        ];

        const sqlAttachmentFamily = [
            {
                'command': 'where',
                'column': 'admin_attachment_family.resource_id',
                'operator': '=',
                'value': 'market-product'
            },
            {
                'command': 'orderBy',
                'operator': 'asc',
                'column': 'admin_attachment_family.name'
            }
        ];

        const sqlProduct = [
            {
                'command': 'where',
                'column': 'market_product_lang.lang_id',
                'operator': '=',
                'value': this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                'command': 'orderBy',
                'operator': 'asc',
                'column': 'market_product.sort'
            }
        ];

        if (this.params['id']) {
            sqlProduct.push({
                command: 'where',
                column: 'market_product.id',
                operator: '<>',
                value: this.params['id']
            });
        }

        const sqlFieldGroup = [
            {
                command: 'where',
                column: 'resource_id',
                operator: '=',
                value: 'market-product'
            }
        ];

        const sqlStock = [
            {
                command: 'where',
                column: 'product_id',
                operator: '=',
                value: this.params['id']
            }
        ];

        const configProductTypes = {
            key: 'pulsar-market.productTypes',
            lang: this.baseLang,
            property: 'name'
        };

        const configPriceTypes = {
            key: 'pulsar-market.priceTypes',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            sqlCategory,
            sqlAttachmentFamily,
            sqlProduct,
            sqlFieldGroup,
            sqlStock,
            configProductTypes,
            configPriceTypes
        };
    }

    setRelationsData(data: any) 
    {
        // market product types
        this.productTypes = data.marketProductTypes;

        // market price types
        this.priceTypes = data.marketPriceTypes;

        // market product class taxes
        this.productClassTaxes = data.marketProductClassTaxes;

        // market product category
        this.categories = data.marketCategories;

        // market admin field groups
        this.fieldGroups = data.adminFieldGroups;

        // market products
        this.products = data.marketProducts;
    }

    afterPatchValueEdit()
    {
        // set market categories extracting ids
        this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id'));

        this.handleGetProductTaxes(
            this.fg.controls['subtotal'].value,
            true, // force to calulate price without tax
            // callback, all http petition must to be sequential to pass JWT
            () => {
                // get fields if object has field group
                if (this.object.field_group_id) {
                    // set FormGroup with custom FormControls
                    // this.handleGetCustomFields();
                }
            }
        ); // calculate tax prices
    }

    // get taxes for product
    handleGetProductTaxes(subtotal?, forceCalculatePriceWithoutTax?, callback?): void 
    {
        let price;

        if (subtotal) 
        {
            price = subtotal;
        }
        else if (this.fg.controls['price'].value)
        {
            price = this.fg.controls['price'].value;
        }
        else
        {
            price = this.fg.controls['subtotal'].value;
            forceCalculatePriceWithoutTax = true;
        }

        // if has not price, exit of method
        if (! price) 
        {
            if (callback) callback();
            return;
        }

        // active loading spinner
        if (this.fg.controls['price'].value) this.loadingPrice = true;

        const args = {
            price: price,
            productClassTax: this.fg.controls['product_class_tax_id'].value
        };

        // force to calualte price without tax, when show product the price always
        // is without tax because is subtotal the refernece price, this flag is activated in
        // function setData os this component
        if (forceCalculatePriceWithoutTax) args['productTaxPrices'] = 1;

        const ob = this.httpService
            .apolloClient()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: gql`
                    query MarketProductTaxes ($price:Float! $productClassTax:Int $productTaxPrices:Int) {
                        marketProductTaxes (price:$price productClassTax:$productClassTax productTaxPrices:$productTaxPrices)
                    }
                `,
                variables: args
            })
            .valueChanges
            .subscribe(({data}: any) => {
                ob.unsubscribe();
                if (this.env.debug) console.log('DEBUG - response of marketProductTaxes query: ', data);

                this.fg.controls['subtotal'].setValue(data.marketProductTaxes.subtotal);
                this.fg.controls['subtotal_format'].setValue(data.marketProductTaxes.subtotalFormat);
                this.fg.controls['tax_format'].setValue(data.marketProductTaxes.taxAmountFormat);
                this.fg.controls['total_format'].setValue(data.marketProductTaxes.totalFormat);

                if (callback) callback();

                // reset price field
                if (this.fg.controls['price'].value) this.fg.controls['price'].setValue(null);

                this.loadingPrice = false;
            });
    }
}
