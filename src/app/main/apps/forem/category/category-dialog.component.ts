import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from '@horus/services/validation-message.service';
import { HttpService } from '@horus/services/http.service';
import { graphQL } from './category.graphql';
import { horusConfig } from 'app/horus-config';

@Component({
    selector: 'dh2-forem-category-dialog',
    template: `
        <h1 mat-dialog-title>
            <mat-icon>chrome_reader_mode</mat-icon>
            {{ 'APPS.CATEGORY' | translate }}
        </h1>
        <div mat-dialog-content>
            <form id="formCategoryDialogDetail" 
                  [formGroup]="fg" 
                  (ngSubmit)="postRecord()">
                <div fxLayout="column" fxFlex>
                    <div fxLayout="row">
                        <mat-form-field [appearance]="horusConfig.fieldAppearance" class="col-12">
                            <mat-label>{{ 'APPS.NAME' | translate }}</mat-label>
                            <input dh2Slug [model]="graphQL.model" (checkingSlug)="handleCheckingSlug($event)" matInput formControlName="name" required>
                            <mat-error>{{ formErrors?.name }}</mat-error>
                        </mat-form-field>
                    </div>

                    <div fxLayout="row">
                        <mat-form-field [appearance]="horusConfig.fieldAppearance" class="col-12">
                            <mat-label>{{ 'APPS.SLUG' | translate }}</mat-label>
                            <mat-spinner *ngIf="loadingSlug" matPrefix mode="indeterminate" diameter="17" class="mr-10"></mat-spinner>
                            <input dh2Slug [model]="graphQL.model" (checkingSlug)="handleCheckingSlug($event)" matInput formControlName="slug" required>
                            <mat-error>{{ formErrors?.slug }}</mat-error>
                        </mat-form-field>
                    </div>
                </div>
            </form>
        </div>
        <div mat-dialog-actions>
            
            <button mat-raised-button
                    type="submit"
                    form="formCategoryDialogDetail"
                    class="mat-accent mr-16"
                    [disabled]="fg.pristine || loadingButton || loadingSlug" 
                    cdkFocusInitial>
                {{ 'APPS.SAVE' | translate }}
                <mat-spinner class="ml-15 d-inline" *ngIf="loadingButton" mode="indeterminate" diameter="17"></mat-spinner>
            </button>
            
            <button mat-raised-button 
                    [mat-dialog-close]="false">
                {{ 'APPS.CANCEL' | translate }}
            </button>
            
        </div>
    `
})
export class CategoryDialogComponent implements OnInit
{
    fg: FormGroup;
    formErrors: any = {};
    graphQL = graphQL;
    loadingSlug = false;
    loadingButton = false;
    horusConfig = horusConfig;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CategoryDialogComponent>,
        private _fb: FormBuilder,
        private _validationMessageService: ValidationMessageService,
        private _http: HttpService
    ) 
    {
        this.createForm();
    }

    createForm(): void
    {
        this.fg = this._fb.group({
            name: ['', Validators.required],
            slug: ['', Validators.required]
        });
    }

    ngOnInit(): void
    {
        this._validationMessageService.subscribeForm(this.fg, this.formErrors);
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
                    this._dialogRef.close(res.data.foremCreateCategory);
                });
        }
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
