import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './wine.graphql';
import { Category, PriceType, Product, ProductClassTax, ProductType, Section, Stock } from '../../market/market.models';
import { MarketableService } from '../../../core/components/marketable/marketable.service';
import { StockableService } from '../../../core/components/stockable/stockable.service';
import { AttachmentFamily } from '../../admin/admin.models';
import { Appellation, Award, Family, Grape, Pairing, Presentation, Type, Winery } from '../wine.models';
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
    graphQL = graphQL;
    attachmentFamilies: AttachmentFamily[] = [];
    loadingSlug = false;
    loadingPrice = false;
    stocksData = [];

    // relations fields
    appellations: Appellation[] = [];
    awards: Award[] = [];
    families: Family[] = [];
    grapes: Grape[] = [];
    pairings: Pairing[] = [];
    presentations: Presentation[] = [];
    types: Type[] = [];
    wineries: Winery[] = [];

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
            winery_id: [null, Validators.required],
            appellation_id: [null, Validators.required],
            abv: null,
            country_id: null,
            territorial_area_1_id: null,
            territorial_area_2_id: null,
            territorial_area_3_id: null,
            average: null,
            parker: null,
            suckling: null,
            penin: null,
            decanter: null,
            wine_spectator: null,

            // wine_lang
            production: null,
            tasting: null,
            tasting_look: null,
            tasting_nose: null,
            tasting_mouth: null,
            tasting_temperature: null,
            tasting_consumption: null,
            vineyard: null,
            vineyard_name: null,
            vineyard_area: null,
            vineyard_description: null,
            vineyard_age: null,
            vineyard_soil: null,
            vineyard_weather: null,
            vineyard_performance: null,
            vineyard_vintage: null,
            vineyard_vinification: null,
            vineyard_aging: null,
            vineyard_bottling: null,

            attachments: this.fb.array([]),

            // marketable
            is_product: false,
            product_id: null
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

        const sqlAppellation = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'wine_appellation.name'
            }
        ];

        const sqlAward = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'wine_award.name'
            }
        ];

        const sqlFamily = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'wine_family.name'
            }
        ];

        const sqlGrape = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'wine_grape.name'
            }
        ];

        const sqlParing = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'wine_pairing.name'
            }
        ];

        const sqlPresentation = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'wine_presentation.name'
            }
        ];

        const sqlType = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'wine_type.name'
            }
        ];

        const sqlWinery = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'wine_winery.name'
            }
        ];

        return {
            ...marketableRelations,
            ...stockableRelations,
            sqlAttachmentFamily,
            sqlAppellation,
            sqlAward,
            sqlFamily,
            sqlGrape,
            sqlParing,
            sqlPresentation,
            sqlType,
            sqlWinery
        };
    }

    setRelationsData(data: any): void
    {
        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;

        // wine appellations
        this.appellations = data.wineAppellations;

        // wine awards
        this.awards = data.wineAwards;

        // wine families
        this.families = data.wineFamilies;

        // wine grapes
        this.grapes = data.wineGrapes;

        // wine pairings
        this.pairings = data.winePairings;

        // wine presentations
        this.presentations = data.winePresentations;

        // wine types
        this.types = data.wineTypes;

        // wine wineries
        this.wineries = data.wineWineries;


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
    }

    afterPatchValueEdit(): void
    {
        if (this.fg.get('is_product').value)
        {
            this._marketable.afterPatchValueEdit(
                this.fg,
                this.object.categories,
                this.object.sections,
                this.fg.get('subtotal').value,
                true
            );
        }
    }

    getCustomArgumentsPostRecord(args, object): Object
    {
        return this._marketable.getCustomArgumentsPostRecord(args);
    }
}

