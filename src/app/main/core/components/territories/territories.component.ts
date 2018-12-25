import { Component, Input, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { HttpService } from './../../services/http.service';
import { Country, TerritorialArea1, TerritorialArea2, TerritorialArea3 } from './../../../apps/admin/admin.models';
import { SelectSearchService } from './../../services/select-search.service';
import { environment } from 'environments/environment';
import gql from 'graphql-tag';
import * as _ from 'lodash';
import { takeUntil } from 'rxjs/operators';
import { pulsarConfig } from './../../../pulsar-config';

/* tslint:disable:max-line-length */
@Component({
    selector: 'dh2-territories',
    template: `
        <div [formGroup]="formGroup">
            
            <div fxLayout="row">
                <mat-form-field [appearance]="pulsarConfig.fieldAppearance" class="col">
                    <mat-label>{{ 'APPS.COUNTRY' | translate }}</mat-label>
                    <mat-select [formControlName]="countryControlName" (selectionChange)="handleChangeCountry($event)" [required]="required.indexOf('country') > -1">
                        <ngx-mat-select-search [formControl]="countryFilterCtrl"
                                               placeholderLabel="{{ 'APPS.SEARCH' | translate }}"
                                               noEntriesFoundLabel="{{ 'APPS.NO_MATCHING' | translate }}"></ngx-mat-select-search>
                        <mat-option *ngFor="let country of filteredCountries | async" [value]="country.id">{{ country.name }}</mat-option>
                    </mat-select>
                    <mat-error>{{ formErrors ? formErrors[countryControlName] : null }}</mat-error>
                </mat-form-field>
            </div>

            <div fxLayout="row" *ngIf="showTerritorialAreas1">
                <mat-form-field [appearance]="pulsarConfig.fieldAppearance" class="col">
                    <mat-label>{{ country?.territorial_area_1 }}</mat-label>
                    <mat-select [formControlName]="territorialArea1ControlName" (selectionChange)="handleChangeTerritorialArea1($event)" [required]="required.indexOf('territorial_area_1') > -1">
                        <mat-option *ngFor="let territorialArea1 of territorialAreas1" [value]="territorialArea1.id">{{ territorialArea1.name }}</mat-option>
                    </mat-select>
                    <mat-error>{{ formErrors ? formErrors[territorialArea1ControlName] : null }}</mat-error>
                </mat-form-field>
            </div>

            <div fxLayout="row" *ngIf="showTerritorialAreas2">
                <mat-form-field [appearance]="pulsarConfig.fieldAppearance" class="col">
                    <mat-label>{{ country?.territorial_area_2 }}</mat-label>
                    <mat-select [formControlName]="territorialArea2ControlName" (selectionChange)="handleChangeTerritorialArea2($event)" [required]="required.indexOf('territorial_area_2') > -1">
                        <mat-option *ngFor="let territorialArea2 of territorialAreas2" [value]="territorialArea2.id">{{ territorialArea2.name }}</mat-option>
                    </mat-select>
                    <mat-error>{{ formErrors ? formErrors[territorialArea2ControlName] : null }}</mat-error>
                </mat-form-field>
            </div>

            <div fxLayout="row" *ngIf="showTerritorialAreas3">
                <mat-form-field [appearance]="pulsarConfig.fieldAppearance" class="col">
                    <mat-label>{{ country?.territorial_area_2 }}</mat-label>
                    <mat-select [formControlName]="territorialArea3ControlName" [required]="required.indexOf('territorial_area_3') > -1">
                        <mat-option *ngFor="let territorialArea3 of territorialAreas3" [value]="territorialArea3.id">{{ territorialArea3.name }}</mat-option>
                    </mat-select>
                    <mat-error>{{ formErrors ? formErrors[territorialArea3ControlName] : null }}</mat-error>
                </mat-form-field>
            </div>
            
        </div>
    `
})

export class TerritoriesComponent implements OnChanges, OnInit, OnDestroy
{
    @Input() formGroup: FormGroup;
    @Input() formErrors: any = {};
    @Input() countryControlName = 'country_id';
    @Input() countries: Country[] = [];
    @Input() territorialArea1ControlName = 'territorial_area_1_id';
    @Input() territorialArea2ControlName = 'territorial_area_2_id';
    @Input() territorialArea3ControlName = 'territorial_area_3_id';
    @Input() required = [];

    // countries
    countryFilterCtrl: FormControl = new FormControl();
    filteredCountries: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1);

    country: Country;
    territorialAreas1: TerritorialArea1[] = [];
    territorialAreas2: TerritorialArea2[] = [];
    territorialAreas3: TerritorialArea3[] = [];
    showTerritorialAreas1 = false;
    showTerritorialAreas2 = false;
    showTerritorialAreas3 = false;
    isLoadedComponent = false;
    pulsarConfig = pulsarConfig;

    private _onDestroy = new Subject();

    constructor(
        private _http: HttpService,
        private _selectSearch: SelectSearchService
    )
    {}

    ngOnChanges(): void
    {
        // check if component is loaded
        if (this.isLoadedComponent) return;

        this.country = <Country>_.find(this.countries, {id: this.formGroup.get(this.countryControlName).value});
        this.filteredCountries.next(this.countries.slice());

        // check the country exist
        if (! this.country) return;

        // set component how loaded
        this.isLoadedComponent = true;

        // set zones with country zones
        if (
            this.country.zones && Array.isArray(this.country.zones) &&
            (this.country.zones.indexOf('territorial_areas_1') > -1 || this.country.zones.indexOf('territorial_areas_2') > -1 || this.country.zones.indexOf('territorial_areas_3') > -1))
        {
            const zones = [];

            if (this.country.zones.indexOf('territorial_areas_1') > -1 && this.formGroup.get(this.territorialArea1ControlName).value)
            {
                zones.push('territorial_areas_1');
            }

            if (this.country.zones.indexOf('territorial_areas_2') > -1 && this.formGroup.get(this.territorialArea2ControlName).value)
            {
                zones.push('territorial_areas_2');
            }

            if (this.country.zones.indexOf('territorial_areas_3') > -1 && this.formGroup.get(this.territorialArea3ControlName).value)
            {
                zones.push('territorial_areas_3');
            }

            if (zones.length > 0) this.load(zones);
        }
        // set zones without country zones
        else
        {
            const zones = [];

            if (this.formGroup.get(this.territorialArea1ControlName).value) zones.push('territorial_areas_1');
            if (this.formGroup.get(this.territorialArea2ControlName).value) zones.push('territorial_areas_2');
            if (this.formGroup.get(this.territorialArea3ControlName).value) zones.push('territorial_areas_3');

            if (zones.length > 0) this.load(zones);
        }
    }

    ngOnInit(): void
    {
        this.setSelectSearch();
    }

    ngOnDestroy(): void
    {
        this._onDestroy.next();
        this._onDestroy.complete();
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

    handleChangeCountry($event): void
    {
        this.showTerritorialAreas1 = false;
        this.showTerritorialAreas2 = false;
        this.showTerritorialAreas3 = false;

        // get country select
        this.country = <Country>_.find(this.countries, {id: $event.value});

        if (this.country)
        {
            if (
                this.country.zones && Array.isArray(this.country.zones) &&
                (this.country.zones.indexOf('territorial_areas_1') > -1 || this.country.zones.indexOf('territorial_areas_2') > -1 || this.country.zones.indexOf('territorial_areas_3') > -1))
            {
                if (this.country.zones.indexOf('territorial_areas_1') > -1)
                {
                    this.load('territorial_areas_1');
                }
                else if (this.country.zones.indexOf('territorial_areas_2') > -1)
                {
                    this.load('territorial_areas_2');
                }
                else
                {
                    this.load('territorial_areas_3');
                }
            }
            else
            {
                this.load('territorial_areas_1');
            }
        }
    }

    handleChangeTerritorialArea1($event): void
    {
        this.showTerritorialAreas2 = false;
        this.showTerritorialAreas3 = false;

        if (this.country.zones && Array.isArray(this.country.zones))
        {
            if (this.country.zones.indexOf('territorial_areas_2') > -1 || this.country.zones.indexOf('territorial_areas_3') > -1)
            {
                if (this.country.zones.indexOf('territorial_areas_2') > -1)
                {
                    this.load('territorial_areas_2');
                }
                else
                {
                    this.load('territorial_areas_3');
                }
            }
        }
        else
        {
            this.load('territorial_areas_2');
        }
    }

    handleChangeTerritorialArea2($event): void
    {
        this.showTerritorialAreas3 = false;

        if (this.country.zones && Array.isArray(this.country.zones))
        {
            if (this.country.zones.indexOf('territorial_areas_3') > -1) this.load('territorial_areas_3');
        }
        else
        {
            this.load('territorial_areas_3');
        }
    }

    load(...ta: any[]): void
    {
        // if first element is array, set array like argument
        if (Array.isArray(ta[0])) ta = ta[0];

        // start make the query
        let fnArguments = 'query Territories (';
        let graphQLQuery = '';
        const variables: any = {};

        if (ta.indexOf('territorial_areas_1') > -1)
        {
            fnArguments += ' $ta1Sql:[CoreSQLInput]';
            graphQLQuery += `
                territorialAreas1: adminTerritorialAreas1 (sql:$ta1Sql) {
                    ... on AdminTerritorialArea1 {
                        ix
                        id
                        country_id
                        name
                        slug
                    }
                }
            `;
            variables.ta1Sql = [
                {
                    command: 'where',
                    column: 'admin_territorial_area_1.country_id',
                    operator: '=',
                    value: this.country.id
                },
                {
                    command: 'orderBy',
                    operator: 'asc',
                    column: 'admin_territorial_area_1.name'
                }
            ];
        }

        if (ta.indexOf('territorial_areas_2') > -1)
        {
            fnArguments += ' $ta2Sql:[CoreSQLInput]';
            graphQLQuery += `
                territorialAreas2: adminTerritorialAreas2 (sql:$ta2Sql) {
                   ... on AdminTerritorialArea2 {
                        ix
                        id
                        country_id
                        territorial_area_1_id
                        name
                        slug
                    }
                }
            `;
            variables.ta2Sql = [
                {
                    command: 'where',
                    column: 'admin_territorial_area_2.country_id',
                    operator: '=',
                    value: this.country.id
                },
                {
                    command: 'orderBy',
                    operator: 'asc',
                    column: 'admin_territorial_area_2.name'
                }
            ];

            // filter by territorial area 1 is has value and territorial area 1 is show
            if (this.formGroup.get(this.territorialArea1ControlName).value)
            {
                if (! this.country.zones || (this.country.zones && Array.isArray(this.country.zones) && this.country.zones.indexOf('territorial_areas_1') > -1))
                {
                    variables.ta2Sql.push({
                        command: 'where',
                        column: 'admin_territorial_area_2.territorial_area_1_id',
                        operator: '=',
                        value: this.formGroup.get(this.territorialArea1ControlName).value
                    });
                }

            }
        }

        if (ta.indexOf('territorial_areas_3') > -1)
        {
            fnArguments += ' $ta3Sql:[CoreSQLInput]';
            graphQLQuery += `
                territorialAreas3: adminTerritorialAreas3 (sql:$ta3Sql) {
                    ... on AdminTerritorialArea3 {
                        ix
                        id
                        country_id
                        territorial_area_1_id
                        territorial_area_2_id
                        name
                        slug
                    }
                }
            `;
            variables.ta3Sql = [
                {
                    command: 'where',
                    column: 'admin_territorial_area_3.country_id',
                    operator: '=',
                    value: this.country.id
                },
                {
                    command: 'orderBy',
                    operator: 'asc',
                    column: 'admin_territorial_area_3.name'
                }
            ];

            // filter by territorial area 1 is has value and territorial area 1 is show
            if (this.formGroup.get(this.territorialArea1ControlName).value)
            {
                if (! this.country.zones || (this.country.zones && Array.isArray(this.country.zones) && this.country.zones.indexOf('territorial_areas_1') > -1))
                {
                    variables.ta3Sql.push({
                        command: 'where',
                        column: 'admin_territorial_area_3.territorial_area_1_id',
                        operator: '=',
                        value: this.formGroup.get(this.territorialArea1ControlName).value
                    });
                }
            }

            // filter by territorial area 2 is has value and territorial area 2 is show
            if (this.formGroup.get(this.territorialArea2ControlName).value)
            {
                if (! this.country.zones || (this.country.zones && Array.isArray(this.country.zones) && this.country.zones.indexOf('territorial_areas_2') > -1))
                {
                    variables.ta3Sql.push({
                        command: 'where',
                        column: 'admin_territorial_area_3.territorial_area_2_id',
                        operator: '=',
                        value: this.formGroup.get(this.territorialArea2ControlName).value
                    });
                }
            }
        }

        fnArguments += ' ) {';
        // end make the query


        if (environment.debug) console.log('DEBUG - response of query to get territorial areas: ', variables);

        const ob$ = this._http
            .apolloClient()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: gql`
                    ${fnArguments}
                    ${graphQLQuery}
                }`,
                variables: variables
            })
            .valueChanges
            .subscribe(({data}: any) => {
                ob$.unsubscribe();
                if (environment.debug) console.log('DEBUG - response of query to get territorial areas: ', data);

                // set territorial areas
                if (data.territorialAreas1 && Array.isArray(data.territorialAreas1) && data.territorialAreas1.length > 0)
                {
                    this.territorialAreas1 = data.territorialAreas1;
                    this.showTerritorialAreas1 = true;
                }

                if (data.territorialAreas2 && Array.isArray(data.territorialAreas2) && data.territorialAreas2.length > 0)
                {
                    this.territorialAreas2 = data.territorialAreas2;
                    this.showTerritorialAreas2 = true;
                }

                if (data.territorialAreas3 && Array.isArray(data.territorialAreas3) && data.territorialAreas3.length > 0)
                {
                    this.territorialAreas3 = data.territorialAreas3;
                    this.showTerritorialAreas3 = true;
                }
            });
    }
}
