import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './wine.graphql';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Category, PriceType, Product, ProductClassTax, ProductType, Section, Stock } from '../../market/market.models';
import { MarketableService } from '../../../core/components/marketable/marketable.service';
import { StockableService } from '../../../core/components/stockable/stockable.service';
import { AttachmentFamily } from '../../admin/admin.models';
import { Appellation, Award, Family, Grape, Pairing, Presentation, Type, Winery } from '../wine.models';
import * as _ from 'lodash';
import {SelectSearchService} from '../../../core/services/select-search.service';


import {MatDialog} from '@angular/material';
import {TypeDialogComponent} from '../type/type-dialog.component';

@Component({
    selector: 'dh2-wine-detail',
    templateUrl: 'wine-detail.component.html',
    animations: fuseAnimations
})
export class WineDetailComponent extends CoreDetailComponent implements OnInit
{
    objectTranslation = 'WINE.WINE';
    objectTranslationGender = 'M';
    graphQL = graphQL;
    attachmentFamilies: AttachmentFamily[] = [];
    loadingSlug = false;
    loadingPrice = false;
    stocksData = [];

    // awards
    awards: Award[] = [];
    awardFilterCtrl: FormControl = new FormControl();
    filteredAwards: ReplaySubject<Award[]> = new ReplaySubject<Award[]>(1);

    // appellations
    appellations: Appellation[] = [];
    appellationFilterCtrl: FormControl = new FormControl();
    filteredAppellations: ReplaySubject<Appellation[]> = new ReplaySubject<Appellation[]>(1);

    // families
    families: Family[] = [];
    familyFilterCtrl: FormControl = new FormControl();
    filteredFamilies: ReplaySubject<Family[]> = new ReplaySubject<Family[]>(1);

    // grapes
    grapes: Grape[] = [];
    grapeFilterCtrl: FormControl = new FormControl();
    filteredGrapes: ReplaySubject<Grape[]> = new ReplaySubject<Grape[]>(1);

    // pairings
    pairings: Pairing[] = [];
    pairingFilterCtrl: FormControl = new FormControl();
    filteredPairings: ReplaySubject<Pairing[]> = new ReplaySubject<Pairing[]>(1);

    // presentations
    presentations: Presentation[] = [];
    presentationFilterCtrl: FormControl = new FormControl();
    filteredPresentations: ReplaySubject<Presentation[]> = new ReplaySubject<Presentation[]>(1);

    // types
    types: Type[] = [];
    typeFilterCtrl: FormControl = new FormControl();
    filteredTypes: ReplaySubject<Type[]> = new ReplaySubject<Type[]>(1);

    // wineries
    wineries: Winery[] = [];
    wineryFilterCtrl: FormControl = new FormControl();
    filteredWineries: ReplaySubject<Winery[]> = new ReplaySubject<Winery[]>(1);

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
        private _stockable: StockableService,
        private _selectSearch: SelectSearchService,
        private _dialog: MatDialog
    ) {
        super(_injector, graphQL);
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        this.setSelectSearch();
    }

    setSelectSearch(): void
    {
        // appellation
        this.appellationFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.appellationFilterCtrl,
                    this.appellations,
                    this.filteredAppellations
                );
            });

        // award
        this.awardFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.awardFilterCtrl,
                    this.awards,
                    this.filteredAwards
                );
            });

        // family
        this.familyFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.familyFilterCtrl,
                    this.families,
                    this.filteredFamilies
                );
            });

        // pairing
        this.pairingFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.pairingFilterCtrl,
                    this.pairings,
                    this.filteredPairings
                );
            });

        // presentation
        this.presentationFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.presentationFilterCtrl,
                    this.presentations,
                    this.filteredPresentations
                );
            });

        // type
        this.typeFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.typeFilterCtrl,
                    this.types,
                    this.filteredTypes
                );
            });

        // winery
        this.wineryFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.wineryFilterCtrl,
                    this.wineries,
                    this.filteredWineries
                );
            });
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
            family_id: [null, Validators.required],
            type_id: [null, Validators.required],
            vintage: null,
            winery_id: [null, Validators.required],
            appellation_id: [null, Validators.required],
            presentation_id: null,
            abv: null,
            country_id: null,
            territorial_area_1_id: null,
            territorial_area_2_id: null,
            territorial_area_3_id: null,
            score_average: null,
            parker: null,
            suckling: null,
            penin: null,
            decanter: null,
            wine_spectator: null,
            awards_id: [],
            grapes_id: [],
            pairings_id: [],

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
        this.filteredAppellations.next(this.appellations.slice());

        // wine awards
        this.awards = data.wineAwards;
        this.filteredAwards.next(this.awards.slice());

        // wine families
        this.families = data.wineFamilies;
        this.filteredFamilies.next(this.families.slice());

        // wine grapes
        this.grapes = data.wineGrapes;
        this.filteredGrapes.next(this.grapes.slice());

        // wine pairings
        this.pairings = data.winePairings;
        this.filteredPairings.next(this.pairings.slice());

        // wine presentations
        this.presentations = data.winePresentations;
        this.filteredPresentations.next(this.presentations.slice());

        // wine types
        this.types = data.wineTypes;
        this.filteredTypes.next(this.types.slice());

        // wine wineries
        this.wineries = data.wineWineries;
        this.filteredWineries.next(this.wineries.slice());


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


    addType(): void
    {
        const dialogRef = this._dialog.open(TypeDialogComponent, {
            data: {
                // stockData: stockData
            },
            width: '80vw'
        });

        dialogRef.afterClosed().subscribe(newStockData => {

            // if (newStockData)
            // {
            //     if (this.env.debug) console.log('DEBUG - Update stock with this arguments: ', newStockData);
            //
            //     const ob$ = this._http
            //         .apolloClient()
            //         .mutate({
            //             mutation: graphQL.mutationSetStock,
            //             variables: {
            //                 payload: {
            //                     warehouse_id: newStockData.warehouse_id,
            //                     product_id: newStockData.product_id,
            //                     stock: newStockData.stock,
            //                     minimum_stock: newStockData.minimum_stock
            //                 }
            //             }
            //         })
            //         .subscribe((response) => {
            //             ob$.unsubscribe();
            //
            //             // Find stock index using _.findIndex (thanks @AJ Richardson for comment)
            //             const index = _.findIndex(this.stocksData, { warehouse_id: newStockData.warehouse_id, product_id: newStockData.product_id });
            //
            //             // Replace stock at index using native splice
            //             this.stocksData.splice(index, 1, newStockData);
            //
            //             this.dataSource.data = this.stocksData;
            //         });
            // }
        });
    }
}

