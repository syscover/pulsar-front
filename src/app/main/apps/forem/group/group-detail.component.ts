import { DomSanitizer } from '@angular/platform-browser';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MatTableDataSource, MatSort } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { Category, Target, Assistance, Type, Expedient, Action, Modality, GroupPrefix, Step } from '../forem.models';
import { Category as ProductCategory } from '../../market/market.models';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectSearchService } from '@horus/services/select-search.service';
import { CategoryDialogComponent } from '../category/category-dialog.component';
import { graphQL } from './group.graphql';
import { PriceType, ProductClass, ProductClassTax, Section } from '../../market/market.models';
import { AuthenticationService } from '@horus/services/authentication.service';
import { MarketableService } from '@horus/components/marketable/marketable.service';
import { DownloadService } from '@horus/services/download.service';
import { UploadService } from '@horus/services/upload.service';
import { AttachmentFamily, Country, Profile, User } from '../../admin/admin.models';
import { environment } from 'environments/environment';
import { File } from '@horus/types';
import gql from 'graphql-tag';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-forem-group-detail',
    templateUrl: 'group-detail.component.html',
    animations: fuseAnimations
})
export class GroupDetailComponent extends CoreDetailComponent  implements OnInit
{
    @ViewChild('slug', {static: false}) slugField;

    objectTranslation = 'FOREM.GROUP';
    objectTranslationGender = 'M';
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
    steps: Step[] = [];
    user: User;
    file;

    // Inscriptions
    displayedColumnsInscription = ['tin', 'name', 'surname', 'email', 'is_coursed', 'is_completed', 'actions'];
    dataSourceInscription = new MatTableDataSource();
    @ViewChild(MatSort, {static: false}) sortInscription: MatSort;

    // Course
    displayedColumnsCourse = ['tin', 'name', 'surname', 'email', 'actions'];
    dataSourceCourse = new MatTableDataSource();
    @ViewChild(MatSort, {static: false}) sortCourse: MatSort;

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
        private _marketable: MarketableService,
        private _authenticationService: AuthenticationService,
        private _downloadService: DownloadService,
        private _sanitizer: DomSanitizer,
        private _uploadService: UploadService,
    ) 
    {
        super(injector, graphQL);
        this.user = this._authenticationService.user();
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
            steps: [],
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
            is_countdown: false,
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

            // trainers data
            trainer_name_1: '',
            trainer_hours_1: '',
            trainer_name_2: '',
            trainer_hours_2: '',
            trainer_name_3: '',
            trainer_hours_3: '',

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
            .pipe(takeUntil(this.$onDestroy))
            .subscribe(() => 
            {
                this._selectSearch.filterSelect(
                    this.categoryFilterCtrl,
                    this.categories,
                    this.filteredCategories
                );
            });
    }

    argumentsRelationsObject(): object 
    {
        // marketable component
        const marketableRelations = this._marketable.getArgumentsRelations(this.baseLang.id, this.params['lang_id'], this.params['product_id'], 'Syscover\\Forem\\Models\\Group');

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

        const configSteps = {
            key: 'pulsar-forem.steps'
        };

        const sqlAdminCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang.id
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
            configGroupPrefixes,
            configSteps
        };
    }

    setRelationsData(data: any): void
    {
        // ***** start - marketable relations
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

        // set steps
        this.steps = <Step[]>data.foremSteps;

        // set profiles
        this.profiles = <Profile[]>data.adminProfiles;

        // forem categories
        this.categories = data.foremCategories;
        this.filteredCategories.next(this.categories.slice());

        // forem inscriptions
        this.dataSourceInscription.sort = this.sortInscription;
        this.dataSourceInscription.data = data.coreObject.inscriptions;

        this.dataSourceCourse.sort = this.sortCourse;
        this.dataSourceCourse.data = data.coreObject.course;
    }

    afterPatchValueEdit(): void
    {
        this.handleChangeCertificate({checked: this.object.certificate});
        this.handleChangeExpedient({value: this.object.expedient_id});

        if (this.fg.get('is_product').value)
        {
            console.log(this.fg.get('subtotal').value);
            console.log(this.fg.value);
            this._marketable.afterPatchValueEdit(
                this.fg,
                this.object.categories,
                this.object.sections,
                this.fg.get('subtotal').value,
                true
            );
        }
    }

    getCustomArgumentsPostRecord(args, object): object
    {
        return this._marketable.getCustomArgumentsPostRecord(args);
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

    exportInscriptions(): void
    {
        this.showSpinner = true;

        const ob$ = this.http
            .apolloClient()
            .mutate({
                mutation: gql`
                    mutation ForemExportInscriptions ($id:Int!) {
                        foremExportInscription (id:$id) {
                            url
                            filename
                            pathname
                            mime
                            size
                        }
                    }
                `,
                variables: {
                    id: this.fg.get('id').value
                }
            })
            .subscribe((res) =>
            {
                ob$.unsubscribe();

                if (environment.debug) console.log('DEBUG - response execute report: ', res);

                // casting to file
                const file = <File>res.data['foremExportInscription'];
                
                if (! file)
                {
                    this.showSpinner = false;
                    return;
                }

                // call download service
                this._downloadService
                    .download(file, () => 
                    {
                        this.showSpinner = false;
                    });
            });
    }

    importInscriptions(files: FileList): void 
    {
        this.file = files.item(0);
        this.file['objectURL'] = this._sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files.item(0)));

        this._uploadService
            .uploadFile(`${this.restUrl}/file`, this.file)
            .subscribe(data => 
            {
                console.log(data);
            });
    }

    subscribe(inscription) 
    {
        this.showSpinner = true;
        const ob$ = this.http
            .apolloClient()
            .mutate({
                mutation: gql`
                    mutation ForemSubscribeGroup ($id:Int!) {
                        foremSubscribeGroup (id:$id)
                    }
                `,
                variables: {
                    id: inscription.id
                }
            })
            .subscribe(({data}) => 
            {
                ob$.unsubscribe();
                if (this.env.debug) console.log('DEBUG - subscribe inscription: ', data, inscription);

                inscription.is_coursed = true;

                // create course
                const course = Object.assign({}, inscription);
                course.id = data.foremSubscribeGroup;
                course.inscription_id = inscription.id;

                // add course
                this.dataSourceCourse.data.push(course);
                this.dataSourceCourse.data = this.dataSourceCourse.data.slice(0);
                this.showSpinner = false;
            });
    }

    unsubscribe(course) 
    {
        this.showSpinner = true;
        const ob$ = this.http
            .apolloClient()
            .mutate({
                mutation: gql`
                    mutation ForemUnsubscribeGroup ($id:Int!) {
                        foremUnsubscribeGroup (id:$id)
                    }
                `,
                variables: {
                    id: course.id
                }
            })
            .subscribe(res => 
            {
                ob$.unsubscribe();
                if (this.env.debug) console.log('DEBUG - unsubscribe inscription: ', res);

                // change inscriptions datatable
                this.dataSourceInscription.data = this.dataSourceInscription.data.map(item => 
                {
                    if(item['id'] === course['inscription_id']) item['is_coursed'] = false;
                    return item;
                });
 
                // delete course from datatable
                this.dataSourceCourse.data = this.dataSourceCourse.data.filter(item => item['id'] !== course.id);
                this.showSpinner = false;
            });
    }
}
