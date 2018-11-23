import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './wine.graphql';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { Category, PriceType, Product, ProductClassTax, ProductClass, Section, Stock } from '../../market/market.models';
import { MarketableService } from '../../../core/components/marketable/marketable.service';
import { StockableService } from '../../../core/components/stockable/stockable.service';
import { AttachmentFamily, Country } from '../../admin/admin.models';
import { Appellation, Award, Family, Grape, Pairing, Presentation, Type, Winery } from '../wine.models';
import { SelectSearchService } from '../../../core/services/select-search.service';
import { AppellationDialogComponent } from '../appellation/appellation-dialog.component';
import { AwardDialogComponent } from '../award/award-dialog.component';
import { FamilyDialogComponent } from '../family/family-dialog.component';
import { GrapeDialogComponent } from '../grape/grape-dialog.component';
import { PairingDialogComponent } from '../pairing/pairing-dialog.component';
import { PresentationDialogComponent } from '../presentation/presentation-dialog.component';
import { TypeDialogComponent } from '../type/type-dialog.component';
import { WineryDialogComponent } from '../winery/winery-dialog.component';
import * as _ from 'lodash';
import {PercentageGrapeDialogComponent} from '../grape/percentage-grape-dialog.component';

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
    countries: Country[] = [];

    // awards
    awards: Award[] = [];
    awardFilterCtrl: FormControl = new FormControl();
    filteredAwards: ReplaySubject<Award[]> = new ReplaySubject<Award[]>(1);
    awardDialogComponent = AwardDialogComponent;

    // appellations
    appellations: Appellation[] = [];
    appellationFilterCtrl: FormControl = new FormControl();
    filteredAppellations: ReplaySubject<Appellation[]> = new ReplaySubject<Appellation[]>(1);
    appellationDialogComponent = AppellationDialogComponent;

    // families
    families: Family[] = [];
    familyFilterCtrl: FormControl = new FormControl();
    filteredFamilies: ReplaySubject<Family[]> = new ReplaySubject<Family[]>(1);
    familyDialogComponent = FamilyDialogComponent;

    // grapes
    grapes: Grape[] = [];
    grapeFilterCtrl: FormControl = new FormControl();
    filteredGrapes: ReplaySubject<Grape[]> = new ReplaySubject<Grape[]>(1);
    grapeDialogComponent = GrapeDialogComponent;

    // pairings
    pairings: Pairing[] = [];
    pairingFilterCtrl: FormControl = new FormControl();
    filteredPairings: ReplaySubject<Pairing[]> = new ReplaySubject<Pairing[]>(1);
    pairingDialogComponent = PairingDialogComponent;

    // presentations
    presentations: Presentation[] = [];
    presentationFilterCtrl: FormControl = new FormControl();
    filteredPresentations: ReplaySubject<Presentation[]> = new ReplaySubject<Presentation[]>(1);
    presentationDialogComponent = PresentationDialogComponent;

    // types
    types: Type[] = [];
    typeFilterCtrl: FormControl = new FormControl();
    filteredTypes: ReplaySubject<Type[]> = new ReplaySubject<Type[]>(1);
    typeDialogComponent = TypeDialogComponent;

    // wineries
    wineries: Winery[] = [];
    wineryFilterCtrl: FormControl = new FormControl();
    filteredWineries: ReplaySubject<Winery[]> = new ReplaySubject<Winery[]>(1);
    wineryDialogComponent = WineryDialogComponent;

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

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            description: '',
            family_id: '',
            type_id: ['', Validators.required],
            vintage: '',
            winery_id: ['', Validators.required],
            appellation_id: ['', Validators.required],
            presentation_id: '',
            abv: '',
            country_id: '',
            territorial_area_1_id: '',
            territorial_area_2_id: '',
            territorial_area_3_id: '',
            score_average: '',
            parker: '',
            suckling: '',
            penin: '',
            decanter: '',
            wine_spectator: '',
            awards_id: [[]],
            grapes_rel: [[]],
            grapes_id: [{}],
            pairings_id: [[]],

            // wine_lang
            production: '',
            tasting: '',
            tasting_look: '',
            tasting_nose: '',
            tasting_mouth: '',
            tasting_temperature: '',
            tasting_consumption: '',
            vineyard: '',
            vineyard_name: '',
            vineyard_area: '',
            vineyard_description: '',
            vineyard_age: '',
            vineyard_soil: '',
            vineyard_weather: '',
            vineyard_performance: '',
            vineyard_vintage: '',
            vineyard_vinification: '',
            vineyard_aging: '',
            vineyard_bottling: '',

            attachments: this.fb.array([]),

            // marketable
            is_product: false,
            product_id: ''
        });
    }

    changeGrapeId(id: number, action: string): void
    {
        const grapes_id = this.fg.get('grapes_id').value;

        if (action === 'add')
        {
            const grape = <Grape>_.find(this.grapes, {'id': id});
            if (grape.composition && grape.composition.percentage)
            {
                grapes_id[id] = { percentage: (<Grape>_.find(this.grapes, {'id': id})).composition.percentage };
            }
            else
            {
                grapes_id[id] = {};
            }
        }
        else if (action === 'delete')
        {
            delete grapes_id[id];
        }

        this.fg.get('grapes_id').setValue(grapes_id);
    }

    setGrapesId(): void
    {
        // set wine grapes extracting ids
        this.fg.get('grapes_rel').setValue(_.uniq(_.map(this.object.grapes, 'id')));

        // set value grapes with percentage
        this.object.grapes.map(selectGrape => {
            this.grapes.map(grape => {
                if (selectGrape.id === grape.id) {
                    if (selectGrape.composition.percentage) grape.composition = selectGrape.composition;
                }
                return grape;
            });
            return selectGrape;
        });
        this.filteredGrapes.next(this.grapes.slice());

        // set grapes id
        const grapes_id = {};
        for (const id of this.fg.get('grapes_rel').value)
        {
            const grape = <Grape>_.find(this.grapes, {'id': id});
            if (grape.composition && grape.composition.percentage)
            {
                grapes_id[id] = { percentage: (<Grape>_.find(this.grapes, {'id': id})).composition.percentage };
            }
            else
            {
                grapes_id[id] = {};
            }
        }
        this.fg.get('grapes_id').setValue(grapes_id);
    }

    disableForm(): void
    {
        this.fg.get('type_id').disable();
        this.fg.get('family_id').disable();
        this.fg.get('vintage').disable();
        this.fg.get('winery_id').disable();
        this.fg.get('appellation_id').disable();
        this.fg.get('presentation_id').disable();
        this.fg.get('abv').disable();
        this.fg.get('country_id').disable();
        this.fg.get('territorial_area_1_id').disable();
        this.fg.get('territorial_area_2_id').disable();
        this.fg.get('territorial_area_3_id').disable();
        this.fg.get('score_average').disable();
        this.fg.get('parker').disable();
        this.fg.get('suckling').disable();
        this.fg.get('penin').disable();
        this.fg.get('decanter').disable();
        this.fg.get('wine_spectator').disable();
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

        // grape
        this.grapeFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.grapeFilterCtrl,
                    this.grapes,
                    this.filteredGrapes
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

    handleCheckingPrice($event): void
    {
        this.loadingPrice = $event;
    }

    handleGrapeOnOptionChange($event): void
    {
        if ($event.isUserInput)
        {
            if ($event.source.selected)
            {
                const dialogRef = this._dialog.open(PercentageGrapeDialogComponent, {
                    data: {
                        grape: _.find(this.grapes, {'id': $event.source.value}),
                        lang: this.lang
                    },
                    width: '80vw'
                });

                dialogRef.afterClosed().subscribe((object: any) => {

                    if (object)
                    {
                        // add percentage to grapes
                        this.grapes.map(grape => {
                            if (grape.id === object.id) grape.composition = { percentage: object.percentage };
                            return grape;
                        });
                    }

                    // add id to grapes_id form control
                    this.changeGrapeId($event.source.value, 'add');
                });
            }
            else {
                // remove composition in grapes
                this.grapes.map(grape => {
                    if (grape.id === $event.source.value) grape.composition = undefined;
                    return grape;
                });

                // delete id in grapes_id form control
                this.changeGrapeId($event.source.value, 'delete');
            }
        }
    }

    argumentsRelationsObject(): Object
    {
        const marketableRelations = this._marketable.getArgumentsRelations(this.baseLang, this.params['lang_id'], this.params['product_id'], 'Syscover\\Wine\\Models\\Wine');

        const stockableRelations = this._stockable.getArgumentsRelations(this.params['product_id']);

        const sqlCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_country.name'
            }
        ];

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

        const sqlPairing = [
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
            sqlCountry,
            sqlAttachmentFamily,
            sqlAppellation,
            sqlAward,
            sqlFamily,
            sqlGrape,
            sqlPairing,
            sqlPresentation,
            sqlType,
            sqlWinery
        };
    }

    setRelationsData(data: any): void
    {
        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;

        // admin attachment families
        this.countries = data.adminCountries;

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
        // set wine awards extracting ids
        this.fg.get('awards_id').setValue(_.uniq(_.map(this.object.awards, 'id')));

        // set data in grapes_id form control
        this.setGrapesId();

        // set wine pairings extracting ids
        this.fg.get('pairings_id').setValue(_.uniq(_.map(this.object.pairings, 'id')));

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

    add(dialog, objects: string, filteredObjects: ReplaySubject<any[]>, formGroupName: string, multiple = false): void
    {
        const dialogRef = this._dialog.open(dialog, {
            data: {
                id: this.object[formGroupName],
                lang: this.lang,
                countries: this.countries // only for wineryDialogComponent
            },
            width: '80vw'
        });

        dialogRef.afterClosed().subscribe((object: any) => {

            if (object)
            {
                if (this.env.debug) console.log('DEBUG - Add element: ', object);

                // objects is the name og objects[], by to get reference. If not,
                // when is create lang and add new lang, mustTranslate pipe doesn't work when change objects array
                this[objects] = this[objects].concat(object);
                this[objects] = _.orderBy(this[objects], ['name'], ['asc']);
                filteredObjects.next(this[objects].slice());

                if (multiple) {
                    this.fg.get(formGroupName).value.push(object.id);
                    this.fg.get(formGroupName).markAsDirty();

                    if (formGroupName === 'grapes_rel')
                    {
                        this.handleGrapeOnOptionChange({
                            isUserInput: true,
                            source: {
                                selected: true,
                                value: object.id
                            }
                        });
                    }
                }
                else {
                    this.fg.get(formGroupName).setValue(object.id);
                }
            }
        });
    }

    calculateAverage(): void
    {
        let scores = 0;
        let total = 0;
        const influencers = ['parker', 'penin', 'wine_spectator', 'decanter', 'suckling'];

        for (const influencer of influencers)
        {
            if (this.fg.get(influencer).value)
            {
                scores++;
                total += parseFloat(this.fg.get(influencer).value);
            }
        }

        this.fg.get('score_average').setValue(total / scores);
    }
}

