import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { Category, Target, Assistance, Type, Expedient, Action, Modality, EmploymentOffice } from '../forem.models';
import { Category as ProductCategory } from '../../market/market.models';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectSearchService } from '../../../core/services/select-search.service';
import { CategoryDialogComponent } from '../category/category-dialog.component';
import * as _ from 'lodash';
import { graphQL } from './group.graphql';
import { PriceType, ProductClass, ProductClassTax, Section } from '../../market/market.models';
import { MarketableService } from '../../../core/components/marketable/marketable.service';

@Component({
    selector: 'dh2-forem-group-detail',
    templateUrl: 'group-detail.component.html',
    animations: fuseAnimations
})
export class GroupDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'FOREM.GROUP';
    objectTranslationGender = 'F';
    loadingSlug = false;
    targets: Target[] = [];
    assistances: Assistance[] = [];
    types: Type[] = [];
    expedients: Expedient[] = [];
    actions: Action[] = [];
    modalities: Modality[] = [];
    employmentOffices: EmploymentOffice[] = [];

    // ***** start - marketable variables
    productCategories: ProductCategory[] = [];
    sections: Section[] = [];
    productClasses: ProductClass[] = [];
    priceTypes: PriceType[] = [];
    productClassTaxes: ProductClassTax[] = [];
    // ***** end - marketable variables

    // categories
    categories: Category[] = [];
    categoryFilterCtrl: FormControl = new FormControl();
    filteredCategories: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);
    categoryDialogComponent = CategoryDialogComponent;

    constructor(
        protected injector: Injector,
        private _selectSearch: SelectSearchService,
        private _dialog: MatDialog,
        private _marketable: MarketableService
    ) {
        super(injector, graphQL);
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
            code: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            category_id: ['', Validators.required],
            target_id: ['', Validators.required],
            assistance_id: ['', Validators.required],
            type_id: ['', Validators.required],
            hours: ['', Validators.required],
            price: '',
            price_hour: '',
            contents: '',
            requirements: '',
            observations: '',

            employment_office_id: ['', Validators.required],
            expedient_id: ['', Validators.required],
            action_id: ['', Validators.required],

            // marketable
            is_product: false,
            product_id: ''
        });
    }

    setSelectSearch(): void
    {
        // category
        this.categoryFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.categoryFilterCtrl,
                    this.categories,
                    this.filteredCategories
                );
            });
    }

    argumentsRelationsObject(): Object
    {
        // marketable component
        const marketableRelations = this._marketable.getArgumentsRelations(this.baseLang, this.params['lang_id'], this.params['product_id'], 'Syscover\\Wine\\Models\\Wine');

        const configTargets = {
            key: 'pulsar-forem.targets'
        };

        const configAssistances = {
            key: 'pulsar-forem.assistances'
        };

        const configTypes = {
            key: 'pulsar-forem.types'
        };

        const configModalities = {
            key: 'pulsar-forem.modalities'
        };

        return {
            ...marketableRelations,
            configTargets,
            configAssistances,
            configTypes,
            configModalities
        };
    }

    setRelationsData(data: any): void
    {
        // set targets
        this.targets = <Target[]>data.foremTargets;

        // set assists
        this.assistances = <Assistance[]>data.foremAssistances;

        // set types
        this.types = <Type[]>data.foremTypes;

        // set expedients
        this.expedients = <Expedient[]>data.foremExpedients;

        // set actions
        this.actions = <Action[]>data.foremActions;

        // set modalities
        this.modalities = <Modality[]>data.foremModalities;

        // set employment offices
        this.employmentOffices = <EmploymentOffice[]>data.foremEmploymentOffices;

        // forem categories
        this.categories = data.foremCategories;
        this.filteredCategories.next(this.categories.slice());
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    add(dialog, objects: string, filteredObjects: ReplaySubject<any[]>, formGroupName: string, multiple = false): void
    {
        const dialogRef = this._dialog.open(dialog, {
            data: {
                id: this.object[formGroupName]
            },
            width: '80vw'
        });

        dialogRef.afterClosed().subscribe((object: any) => {

            if (object)
            {
                if (this.env.debug) console.log('DEBUG - Add element: ', object);

                // Objects is the name of property, by to get reference.
                // If not, when is create lang and add new lang, mustTranslate
                // pipe doesn't work when change objects array
                this[objects] = this[objects].concat(object);
                this[objects] = _.orderBy(this[objects], ['name'], ['asc']);
                filteredObjects.next(this[objects].slice());

                if (multiple) {
                    this.fg.get(formGroupName).value.push(object.id);
                    this.fg.get(formGroupName).markAsDirty();
                }
                else {
                    this.fg.get(formGroupName).setValue(object.id);
                }
            }
        });
    }

    handleChangeAction($event): void
    {
        const data = Object.assign({}, <Object>_.find(this.actions, {id: $event.value}));

        // delete id and rewrite code property, to adapt object to group definition
        delete data['id'];
        data['code'] = this.fg.get('code').value;

        this.fg.patchValue(data);
    }
}
