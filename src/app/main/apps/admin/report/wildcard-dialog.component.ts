import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ValidationMessageService } from '@horus/services/validation-message.service';
import { HttpService } from '@horus/services/http.service';
// import { graphQL } from './winery.graphql';
import { Country, Lang } from '../../admin/admin.models';
import { SelectSearchService } from '@horus/services/select-search.service';
import { horusConfig } from 'app/horus-config';

@Component({
    selector: 'dh2-admin-wildcard-dialog',
    template: `
        <horus-spinner [show]="showSpinner"></horus-spinner>

        <h1 mat-dialog-title>
            <fa-icon [icon]="['fas', 'warehouse']"></fa-icon>
            {{ 'APPS.WILDCARD' | translate }} 
        </h1>

        <div mat-dialog-content>
            <form id="formWineryDialogDetail" 
                  [formGroup]="fg" 
                  (ngSubmit)="postRecord()">

                <div fxLayout="column" fxFlex>

                    <div fxLayout="row">
                        <mat-form-field [appearance]="horusConfig.fieldAppearance" class="col-12">
                            <mat-label>{{ 'APPS.LABEL' | translate }}</mat-label>
                            <input matInput formControlName="label" required>
                            <mat-error>{{ formErrors?.label }}</mat-error>
                        </mat-form-field>
                    </div>

                    <div fxLayout="row">
                        <mat-form-field [appearance]="horusConfig.fieldAppearance" class="col-12">
                            <mat-label>{{ 'APPS.NAME' | translate }}</mat-label>
                            <input matInput formControlName="name" required>
                            <mat-error>{{ formErrors?.name }}</mat-error>
                        </mat-form-field>
                    </div>

                    <div fxLayout="row">
                        <mat-form-field [appearance]="horusConfig.fieldAppearance" class="col-12 col-md-4">
                            <mat-label>{{ 'ADMIN.FIELD_TYPE' | translate }}</mat-label>
                            <mat-select formControlName="field_type_id" required>
                                <mat-option *ngFor="let fieldType of data.fieldTypes" [value]="fieldType.id">{{ fieldType.name }}</mat-option>
                            </mat-select>
                            <mat-error>{{ formErrors?.field_type_id }}</mat-error>
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
                {{ 'APPS.SAVE' | translate }}
                <mat-spinner class="ml-15" *ngIf="loadingButton" mode="indeterminate" diameter="17"></mat-spinner>
            </button>
            
            <button mat-raised-button 
                    [mat-dialog-close]="false">
                {{ 'APPS.CANCEL' | translate }}
            </button>
            
        </div>
    `
})
export class WildcardDialogComponent implements OnInit, OnDestroy
{
    fg: FormGroup;
    formErrors: any = {};
    // graphQL = graphQL;
    loadingSlug = false;
    loadingButton = false;
    showSpinner = false;
    horusConfig = horusConfig;

    // countries
   /*  countries: Country[] = [];
    countryFilterCtrl: FormControl = new FormControl();
    filteredCountries: ReplaySubject<Country[]> = new ReplaySubject<Country[]>(1); */

    protected _onDestroy = new Subject();

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<WildcardDialogComponent>,
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
            label: ['', Validators.required],
            name: ['', Validators.required],
            field_type_id: ['', Validators.required]
        });
    }

    ngOnInit(): void
    {
        this.showSpinner = true;

        this._validationMessageService.subscribeForm(this.fg, this.formErrors);
        // this.lang = this.data.lang;

        // countries
        // this.countries = this.data.countries;
        // this.filteredCountries.next(this.countries.slice());

        /* this.fg.patchValue({
            lang_id: this.lang.id // set lang id in form from object with multiple language
        }); */

        // this.setSelectSearch();

        this.showSpinner = false;
    }

    ngOnDestroy(): void
    {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /* setSelectSearch(): void
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
    } */

    /* postRecord(): void
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
    } */

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
