import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { Category, Target, Assistance, Type, Expedient, Action, Modality, GroupPrefix } from '../forem.models';
import { Category as ProductCategory } from '../../market/market.models';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectSearchService } from '../../../core/services/select-search.service';
import { CategoryDialogComponent } from '../category/category-dialog.component';
import * as _ from 'lodash';
import { graphQL } from './group.graphql';
import { PriceType, ProductClass, ProductClassTax, Section } from '../../market/market.models';
import { MarketableService } from '../../../core/components/marketable/marketable.service';
import { AttachmentFamily, Country, Profile } from '../../admin/admin.models';

@Component({
    selector: 'dh2-forem-group-detail',
    templateUrl: 'group-detail.component.html',
    animations: fuseAnimations
})
export class GroupDetailComponent extends CoreDetailComponent  implements OnInit
{
    @ViewChild('slug') slugField;

    objectTranslation = 'FOREM.GROUP';
    objectTranslationGender = 'F';
    loadingSlug = false;
    targets: Target[] = [];
    assistances: Assistance[] = [];
    types: Type[] = [];
    expedients: Expedient[] = [];
    expedient: Expedient = new Expedient();
    actions: Action[] = [];
    modalities: Modality[] = [];
    countries: Country[] = [];
    attachmentFamilies: AttachmentFamily[] = [];
    profiles: Profile[] = [];
    groupPrefixes: GroupPrefix[] = [];

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
            profile_id: ['', Validators.required],
            prefix_id: ['', Validators.required],
            code: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            category_id: ['', Validators.required],
            target_id: ['', Validators.required],
            assistance_id: ['', Validators.required],
            type_id: ['', Validators.required],
            certificate: false,
            certificate_code: '',
            hours: ['', Validators.required],
            subsidized_amount: '',
            price: '',
            price_hour: '',
            contents_excerpt: '',
            contents: '',
            requirements: '',
            observations: '',

            expedient_id: ['', Validators.required],
            action_id: ['', Validators.required],
            starts_at: '',
            ends_at: '',
            selection_date: '',
            open: false,
            featured: false,
            schedule: '',
            publish: false,

            // geolocation
            address: '',
            country_id: '',
            territorial_area_1_id: '',
            territorial_area_2_id: '',
            territorial_area_3_id: '',
            zip: '',
            locality: '',
            latitude: '',
            longitude: '',

            // marketable
            is_product: false,
            product_id: '',

            attachments: this.fb.array([])
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

        const configGroupPrefixes = {
            key: 'pulsar-forem.group_prefixes'
        };

        const sqlAdminCountry = [
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

        const sqlAdminAttachmentFamily = [
            {
                command: 'where',
                column: 'admin_attachment_family.resource_id',
                operator: '=',
                value: 'forem-group'
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_attachment_family.name'
            }
        ];

        return {
            ...marketableRelations,
            sqlAdminCountry,
            sqlAdminAttachmentFamily,
            configTargets,
            configAssistances,
            configTypes,
            configModalities,
            configGroupPrefixes
        };
    }

    setRelationsData(data: any): void
    {
        // set admin countries
        this.countries = data.adminCountries;

        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;

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

        // set group prefixes
        this.groupPrefixes = <GroupPrefix[]>data.foremGroupPrefixes;

        // set profiles
        this.profiles = <Profile[]>data.adminProfiles;

        // forem categories
        this.categories = data.foremCategories;
        this.filteredCategories.next(this.categories.slice());
    }

    afterPatchValueEdit(): void
    {
        this.handleChangeCertificate({checked: this.object.certificate});
        this.handleChangeExpedient({value: this.object.expedient_id});
    }

    handleChangeExpedient($event): void
    {
        this.expedient = <Expedient>_.find(this.expedients, {id: $event.value});

        if (this.expedient.modality_id === 1)
        {
            this.fg.get('prefix_id').clearValidators();
            this.fg.get('prefix_id').setValue('');
        }
        else
        {
            this.fg.get('prefix_id').setValidators([Validators.required]);
        }
        this.fg.get('prefix_id').updateValueAndValidity();
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    handleCheckingPrice($event): void
    {
    }

    handleChangeCertificate($event): void
    {
        if ($event.checked)
        {
            this.fg.get('certificate_code').setValidators([Validators.required]);
        }
        else
        {
            this.fg.get('certificate_code').clearValidators();
            this.fg.get('certificate_code').setValue('');
        }
        this.fg.get('certificate_code').updateValueAndValidity();
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

        // trigger change event
        const event = new Event('change');
        this.slugField.nativeElement.dispatchEvent(event);
    }
}
