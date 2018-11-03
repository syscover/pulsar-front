import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './product.graphql';
import { StockGraphQLService } from './../stock/stock-graphql.service';
import { Product, ProductType, PriceType, ProductClassTax, Category, Stock, Section } from './../market.models';
import { FieldGroup, AttachmentFamily } from './../../admin/admin.models';
import { MarketableService } from '../../../core/components/marketable/marketable.service';
import { StockableService } from '../../../core/components/stockable/stockable.service';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-market-product-detail',
    templateUrl: './product-detail.component.html',
    animations: fuseAnimations,
    styleUrls: [
        './../../../core/scss/improvements/perfect-scroll-bar.scss'
    ],
    encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent extends CoreDetailComponent implements OnInit
{
    objectTranslation = 'MARKET.PRODUCT';
    objectTranslationGender = 'M';
    fieldGroups: FieldGroup[] = [];
    attachmentFamilies: AttachmentFamily[] = [];
    loadingSlug = false;
    loadingPrice = false;
    startCustomFields = false;
    stocksData = [];

    // ***** start - marketable variables
    products: Product[] = [];
    categories: Category[] = [];
    sections: Section[] = [];
    productTypes: ProductType[] = [];
    priceTypes: PriceType[] = [];
    productClassTaxes: ProductClassTax[] = [];
    // ***** end - marketable variables

    constructor(
        private _injector: Injector,
        private _graphQLStock: StockGraphQLService,
        private _marketable: MarketableService,
        private _stockable: StockableService
    ) {
        super(_injector, graphQL);
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        if (this.dataRoute.action === 'create')
        {
            // allow start dh2-dynamic-form component to avoid failures in the JWT
            this.startCustomFields = true;
        }
    }
    
    createForm(): void
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}],
            field_group_id: null,
            description: null,
            attachments: this.fb.array([])
        });
    }

    handleCheckingSlug($event): void {
        this.loadingSlug = $event;
    }

    handleCheckingPrice($event): void {
        this.loadingPrice = $event;
    }

    disabledForm(): void
    {
        this.fg.controls['sku'].disable();
        this.fg.controls['categories_id'].disable();
        this.fg.controls['sections_id'].disable();
        this.fg.controls['field_group_id'].disable();
        this.fg.controls['type_id'].disable();
        this.fg.controls['parent_id'].disable();
        this.fg.controls['weight'].disable();
        this.fg.controls['active'].disable();
        this.fg.controls['sort'].disable();
        this.fg.controls['price_type_id'].disable();
        this.fg.controls['product_class_tax_id'].disable();
        this.fg.controls['price'].disable();
        this.fg.controls['subtotal'].disable();
        this.fg.controls['subtotal_format'].disable();
        this.fg.controls['tax_format'].disable();
        this.fg.controls['total_format'].disable();
    }

    afterSetData(): void
    {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') 
        {
            if (this.dataRoute.action === 'create-lang') 
            {
                // disabled inputs that hasn't containt multi language
                this.disabledForm();
            } 
            else if (this.dataRoute.action === 'edit') 
            {
                // disabled elements if edit diferent language that base lang
                if (this.lang.id !== this.baseLang) this.disabledForm();
            }
        }
    }
    
    argumentsRelationsObject(): Object 
    {
        const marketableArguments = this._marketable.getArgumentsRelations(this.baseLang, this.params['lang_id'], this.params['id'], null);

        const stockableRelations = this._stockable.getArgumentsRelations(this.params['id']);

        const sqlAttachmentFamily = [
            {
                command: 'where',
                column: 'admin_attachment_family.resource_id',
                operator: '=',
                value: 'market-product'
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_attachment_family.name'
            }
        ];

        const sqlFieldGroup = [
            {
                command: 'where',
                column: 'resource_id',
                operator: '=',
                value: 'market-product'
            }
        ];

        return {
            ...marketableArguments,
            ...stockableRelations,
            sqlAttachmentFamily,
            sqlFieldGroup
        };
    }

    setRelationsData(data: any): void
    {
        // ***** start - marketable relations
        // market products
        this.products = data.marketProducts;

        // market category
        this.categories = data.marketCategories;

        // market product section
        this.sections = data.marketSections;

        // market product types
        this.productTypes = data.marketProductTypes;

        // market price types
        this.priceTypes = data.marketPriceTypes;

        // market product class taxes
        this.productClassTaxes = data.marketProductClassTaxes;
        // ***** end - marketable relations

        // ***** start - stockable relations
        // only set ware house in edit action
        if (this.dataRoute.action === 'edit')
        {
            // market stock data
            const stocksData = [];
            for (const warehouse of data.marketWarehouses)
            {
                const stock = <Stock>_.find(data.marketStocks, {warehouse_id: warehouse.id});
                stocksData.push({
                    warehouse_id: warehouse.id,
                    warehouse_name: warehouse.name,
                    product_id: data.coreObject.id,
                    stock: stock ? stock.stock : 0,
                    minimum_stock: stock ? stock.minimum_stock : 0,
                });
            }
            this.stocksData = stocksData;
        }
        // ***** end - stockable relations

        // market admin field groups
        this.fieldGroups = data.adminFieldGroups;

        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;
    }

    afterPatchValueEdit(): void
    {
        // set market categories extracting ids
        this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id'));

        // set market sections extracting ids
        this.fg.controls['sections_id'].setValue(_.map(this.object.sections, 'id'));

        this._marketable.handleGetProductTaxes(
            this.fg,
            this.fg.get('subtotal').value,
            true, // force to calulate price without tax
            () => { // callback, all http petition must to be sequential to pass JWT
                // allow start dh2-dynamic-form component to avoid failures in the JWT
                this.startCustomFields = true;
            }
        );
    }
}
