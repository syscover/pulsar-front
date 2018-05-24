import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ProductGraphQLService } from './product-graphql.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DynamicFormService } from './../../../core/components/dynamic-form/dynamic-form.service';
import { ProductType, PriceType, ProductClassTax } from './../market.models';


import { User, Field, FieldValue, AttachmentFamily } from './../../admin/admin.models';
import { MatDatepicker } from '@angular/material';
import { MatChipInputEvent } from '@angular/material';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import './../../../core/functions/date-to-json.function';
import { applyMixins } from './../../../core/functions/apply-mixins.function';
import { Chipable } from './../../../core/traits/chipable.trait';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-product-detail',
    templateUrl: './product-detail.component.html',
    animations: fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/perfect-scroll-bar.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent extends CoreDetailComponent implements Chipable
{
    @ViewChild(MatDatepicker) datepicker: MatDatepicker<Date>;
    objectTranslation = 'MARKET.PRODUCT';
    objectTranslationGender = 'M';
    productTypes: ProductType[] = [];
    priceTypes: PriceType[] = [];
    productClassTaxes: ProductClassTax[] = [];





    tags: String[] = [];
    attachmentFamilies: AttachmentFamily[] = [];
    imageStyles: Object = new Object;
    
    
    separatorKeysCodes = [ENTER, COMMA];
    private _attachmentFamilies: AttachmentFamily[];
    
    constructor(
        protected injector: Injector,
        protected graphQL: ProductGraphQLService,
        private authenticationService: AuthenticationService
    ) {
        super(injector, graphQL);
    }
    
    addTag: (formGroup: FormGroup, name: string, event: MatChipInputEvent) => void;
    removeTag: (formGroup: FormGroup, name: string, tag) => void;
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
    }
}
// multiple inheritance
// applyMixins(ArticleDetailComponent, [Chipable]);
