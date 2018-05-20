import { Component, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ProductGraphQLService } from './product-graphql.service';
import { AuthenticationService } from './../../../core/services/authentication.service';
import { DynamicFormService } from './../../../core/components/dynamic-form/dynamic-form.service';

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
            lang_id: ['', Validators.required],
            code: '',
            categories_id: [[], Validators.required],
            name: ['', Validators.required ],
            slug: ['', Validators.required ],
            field_group_id: '',
            type_id: ['', Validators.required],
            parent_id: '',
            weight: [null, Validators.required],
            active: '',
            sort: [null, Validators.required],
            price_type_id: ['', Validators.required],
            product_class_tax_id: ['', Validators.required],
            description: '',
            price: null,
            subtotal: null,
            subtotal_format: [{value: null, disabled: true}, Validators.required ],
            tax_format: [{value: null, disabled: true}, Validators.required ],
            total_format: [{value: null, disabled: true}, Validators.required ],
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
        /* // cms sections
        this.sections = data.cmsSections;
        // cms families
        this.families = data.cmsFamilies;
        // cms articles
        this.articles = data.cmsArticles;
        // cms categories
        this.categories = data.cmsCategories;
        // cms statuses
        this.statuses = data.cmsStatuses;

        // admin attachment families
        // this objects are manage in loadAttachmentFamilies method
        this._attachmentFamilies = data.adminAttachmentFamilies;

        // cms author
        const user = this.authenticationService.user();
        this.fg.patchValue({
            author_id: user.id,
            author_name: user.name + ' ' + user.surname
        }); */
    }
}
// multiple inheritance
// applyMixins(ArticleDetailComponent, [Chipable]);
