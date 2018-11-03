import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './wine.graphql';
import { Category, PriceType, Product, ProductClassTax, ProductType, Section, Stock } from '../../market/market.models';
import { MarketableService } from '../../../core/components/marketable/marketable.service';
import { StockableService } from '../../../core/components/stockable/stockable.service';
import { AttachmentFamily } from '../../admin/admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-wine-detail',
    templateUrl: 'wine-detail.component.html',
    animations: fuseAnimations
})
export class WineDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'WINE.WINE';
    objectTranslationGender = 'M';
    modelWineLang = 'Syscover\\Wine\\Models\\WineLang';
    attachmentFamilies: AttachmentFamily[] = [];
    loadingSlug = false;
    loadingPrice = false;
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
        private _marketable: MarketableService,
        private _stockable: StockableService
    ) {
        super(_injector, graphQL);
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    handleCheckingPrice($event): void {
        this.loadingPrice = $event;
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            slug: [null, Validators.required],
            year: null,
            tasting_note: null,
            is_product: false,
            attachments: this.fb.array([])
        });
    }

    argumentsRelationsObject(): Object
    {
        const marketableRelations = this._marketable.getArgumentsRelations(this.baseLang, this.params['lang_id'], this.params['product_id'], 'Syscover\\Wine\\Models\\Wine');

        const stockableRelations = this._stockable.getArgumentsRelations(this.params['product_id']);

        const sqlAttachmentFamily = [
            {
                command: 'where',
                column: 'admin_attachment_family.resource_id',
                operator: '=',
                value: 'wine-wine'
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_attachment_family.name'
            }
        ];

        return {
            ...marketableRelations,
            ...stockableRelations,
            sqlAttachmentFamily
        };
    }

    setRelationsData(data: any): void
    {
        // ***** start - marketable relations
        // market products
        this.products = data.marketProducts;

        // market categories
        this.categories = data.marketCategories;

        // market sections
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
                    product_id: data.coreObject.product_id,
                    stock: stock ? stock.stock : 0,
                    minimum_stock: stock ? stock.minimum_stock : 0,
                });
            }
            this.stocksData = stocksData;
        }
        // ***** end - stockable relations

        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;
    }

    afterPatchValueEdit(): void
    {
        if (this.fg.get('is_product').value)
        {
            // set market categories extracting ids
            this.fg.get('categories_id').setValue(_.uniq(_.map(this.object.categories, 'id')));

            // set market sections extracting ids
            this.fg.get('sections_id').setValue(_.uniq(_.map(this.object.sections, 'id')));

            this._marketable.handleGetProductTaxes(
                this.fg,
                this.fg.get('subtotal').value,
                true
            );
        }
    }
}

