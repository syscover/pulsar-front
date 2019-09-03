import { Component, Injector, OnInit, ViewEncapsulation } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { graphQL } from './product.graphql';
import { Product, ProductClass, PriceType, ProductClassTax, Category, Stock, Section } from '../market.models';
import { FieldGroup, AttachmentFamily } from '../../admin/admin.models';
import { MarketableService } from '@horus/components/marketable/marketable.service';
import { StockableService } from '@horus/components/stockable/stockable.service';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-market-market-product-detail',
    templateUrl: './product-detail.component.html',
    animations: fuseAnimations,
    styleUrls: [
        '../../../../scss/improvements/perfect-scroll-bar.scss'
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
    productClasses: ProductClass[] = [];
    priceTypes: PriceType[] = [];
    productClassTaxes: ProductClassTax[] = [];
    // ***** end - marketable variables

    constructor(
        private _injector: Injector,
        private _marketable: MarketableService,
        private _stockable: StockableService
    ) 
    {
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
            ix: '',
            id: [{value: '', disabled: true}],
            field_group_id: '',
            description: '',
            attachments: this.fb.array([])
        });
    }

    handleCheckingSlug($event): void {
        this.loadingSlug = $event;
    }

    handleCheckingPrice($event): void {
        this.loadingPrice = $event;
    }

    disableForm(): void
    {
        this.fg.get('active').disable();
        this.fg.get('categories_id').disable();
        this.fg.get('class_id').disable();
        this.fg.get('field_group_id').disable();
        this.fg.get('parent_id').disable();
        this.fg.get('price').disable();
        this.fg.get('price_type_id').disable();
        this.fg.get('product_class_tax_id').disable();
        this.fg.get('sections_id').disable();
        this.fg.get('sku').disable();
        this.fg.get('subtotal').disable();
        this.fg.get('subtotal_format').disable();
        this.fg.get('sort').disable();
        this.fg.get('tax_format').disable();
        this.fg.get('total_format').disable();
        this.fg.get('weight').disable();
    }
    
    argumentsRelationsObject(): object
    {
        const marketableArguments = this._marketable.getArgumentsRelations(this.baseLang.id, this.params['lang_id'], this.params['id'], null);

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

        // market product classes
        this.productClasses = data.marketProductClasses;

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
        this._marketable.afterPatchValueEdit(
            this.fg,
            this.object.categories,
            this.object.sections,
            this.fg.get('subtotal').value,
            true,
            () => 
            {   
                // callback, all http petition must to be sequential to pass JWT
                // allow start dh2-dynamic-form component to avoid failures in the JWT
                this.startCustomFields = true;
            }
        );
    }

    getCustomArgumentsPostRecord(args, object): object
    {
        return this._marketable.getCustomArgumentsPostRecord(args);
    }
}
