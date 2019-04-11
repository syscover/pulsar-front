import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ReplaySubject } from 'rxjs';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/foundations/core-detail-compoment';
import { graphQL } from './winery.graphql';
import { AttachmentFamily, Country } from '../../admin/admin.models';
import { SelectSearchService } from '@horus/services/select-search.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'dh2-winery-detail',
    templateUrl: 'winery-detail.component.html',
    animations: fuseAnimations
})
export class WineryDetailComponent extends CoreDetailComponent implements OnInit
{
    public objectTranslation = 'WINE.WINERY';
    public objectTranslationGender = 'F';
    public graphQL = graphQL;
    public loadingSlug = false;
    public attachmentFamilies: AttachmentFamily[] = [];

    // countries
    public countries: Country[] = [];
    public countryFilterCtrl: FormControl = new FormControl();
    public filteredCountries: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1);

    constructor(
        private _injector: Injector,
        private _selectSearch: SelectSearchService
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
        // country
        this.countryFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.countryFilterCtrl,
                    this.countries,
                    this.filteredCountries
                );
            });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            country_id: ['', Validators.required],
            excerpt: '',
            header: '',
            description: '',
            attachments: this.fb.array([])
        });
    }

    argumentsRelationsObject(): object
    {
        const sqlAttachmentFamily = [
            {
                command: 'where',
                column: 'admin_attachment_family.resource_id',
                operator: '=',
                value: 'wine-winery'
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_attachment_family.name'
            }
        ];

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

        return {
            sqlAttachmentFamily,
            sqlCountry
        };
    }

    setRelationsData(data: any): void
    {
        // admin attachment families
        this.attachmentFamilies = data.adminAttachmentFamilies;

        // set admin countries
        this.countries = data.adminCountries;
        this.filteredCountries.next(this.countries.slice());

    }
}

