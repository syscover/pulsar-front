import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ValidationMessageService } from './../../../core/services/validation-message.service';
import { HttpService } from '../../../core/services/http.service';
import { graphQL } from './winery.graphql';
import { Country, Lang } from '../../admin/admin.models';
import { SelectSearchService } from '../../../core/services/select-search.service';

@Component({
    selector: 'dh2-wine-winery-dialog',
    template: `
        <dh2-spinner [show]="showSpinner"></dh2-spinner>
        <h1 mat-dialog-title>
            <fa-icon [icon]="['fas', 'warehouse']"></fa-icon>
            {{ 'WINE.WINERY' | translate }} 
            <dh2-flag-icon class="d-inline ml-40" [lang]="lang" size="22px" [rounded]="true"></dh2-flag-icon>
        </h1>
        <div mat-dialog-content>
            <form id="formWineryDialogDetail" 
                  [formGroup]="fg" 
                  (ngSubmit)="postRecord()">
                <div fxLayout="column" fxFlex>
                    <div fxLayout="row">
                        <mat-form-field class="col-12">
                            <input dh2Slug [model]="graphQL.model" (checkingSlug)="handleCheckingSlug($event)" matInput placeholder="{{ 'APPS.NAME' | translate }}" formControlName="name" required>
                            <mat-error>{{ formErrors?.name }}</mat-error>
                        </mat-form-field>
                    </div>

                    <div fxLayout="row">
                        <mat-form-field class="col-12">
                            <input dh2Slug [model]="graphQL.model" (checkingSlug)="handleCheckingSlug($event)" matInput placeholder="{{ 'APPS.SLUG' | translate }}" formControlName="slug" required>
                            <mat-spinner *ngIf="loadingSlug" matSuffix mode="indeterminate" diameter="17" class="r-5"></mat-spinner>
                            <mat-error>{{ formErrors?.slug }}</mat-error>
                        </mat-form-field>
                    </div>

                    <div fxLayout="row">
                        <mat-form-field class="col-12 col-md-4">
                            <mat-select placeholder="{{ 'APPS.COUNTRY' | translate }}" formControlName="country_id" required>
                                <ngx-mat-select-search [formControl]="countryFilterCtrl"
                                                       placeholderLabel="{{ 'APPS.SEARCH' | translate }}"
                                                       noEntriesFoundLabel="{{ 'APPS.NO_MATCHING' | translate }}"></ngx-mat-select-search>
                                <mat-option *ngFor="let country of filteredCountries | async" [value]="country.id">{{ country.name }}</mat-option>
                            </mat-select>
                            <mat-error>{{ formErrors?.country_id }}</mat-error>
                        </mat-form-field>
                    </div>
                </div>
            </form>
        </div>
        <div mat-dialog-actions>
            
            <button mat-raised-button
                    type="submit"
                    form="formWineryDialogDetail"
                    class="mat-accent mr-16"
                    [disabled]="fg.pristine || loadingButton || loadingSlug" 
                    cdkFocusInitial>
                <div class="d-flex align-items-center">
                    <span>{{ 'APPS.SAVE' | translate }}</span>
                    <mat-spinner class="ml-15" *ngIf="loadingButton" mode="indeterminate" diameter="17"></mat-spinner>
                </div>
            </button>
            
            <button mat-raised-button 
                    [mat-dialog-close]="false">
                {{ 'APPS.CANCEL' | translate }}
            </button>
            
        </div>
    `
})
export class WineryDialogComponent implements OnInit, OnDestroy
{
    fg: FormGroup;
    lang: Lang;
    formErrors: any = {};
    graphQL = graphQL;
    loadingSlug = false;
    loadingButton = false;
    showSpinner = false;

    // countries
    countries: Country[] = [];
    countryFilterCtrl: FormControl = new FormControl();
    filteredCountries: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1);

    protected _onDestroy = new Subject();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<WineryDialogComponent>,
        private _fb: FormBuilder,
        private _validationMessageService: ValidationMessageService,
        private _http: HttpService,
        private _selectSearch: SelectSearchService
    ) 
    {
        this.createForm();
    }

    createForm(): void
    {
        this.fg = this._fb.group({
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            country_id: ['', Validators.required]
        });
    }

    ngOnInit(): void
    {
        this.showSpinner = true;

        this._validationMessageService.subscribeForm(this.fg, this.formErrors);
        this.lang = this.data.lang;

        // countries
        this.countries = this.data.countries;
        this.filteredCountries.next(this.countries.slice());

        this.fg.patchValue({
            lang_id: this.lang.id // set lang id in form from object with multiple language
        });

        this.setSelectSearch();

        this.showSpinner = false;
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

    postRecord(): void
    {
        if (this.fg.valid)
        {
            this.loadingButton = true;

            const ob$ = this._http
                .apolloClient()
                .mutate({
                    mutation: graphQL.mutationCreateObject,
                    variables: {
                        payload: this.fg.value
                    }
                })
                .subscribe(res => {

                    ob$.unsubscribe();
                    this.loadingButton = false;
                    this._dialogRef.close(res.data.wineCreateWinery);
                });
        }
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
