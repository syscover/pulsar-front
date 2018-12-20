import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from './../../../core/services/validation-message.service';
import { HttpService } from '../../../core/services/http.service';
import { graphQL } from './family.graphql';
import { ConfigService } from '../../../core/services/config.service';
import { Lang } from '../../admin/admin.models';

@Component({
    selector: 'dh2-wine-family-dialog',
    template: `
        <dh2-spinner [show]="showSpinner"></dh2-spinner>
        <h1 mat-dialog-title>
            <mat-icon>category</mat-icon>
            {{ 'APPS.FAMILY' | translate }}
            <dh2-flag-icon class="d-inline ml-40" [lang]="lang" size="22px" [rounded]="true"></dh2-flag-icon>
        </h1>
        <div mat-dialog-content>
            <form id="formFamilyDialogDetail" 
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
                            <mat-spinner *ngIf="loadingSlug" matPrefix mode="indeterminate" diameter="17" class="mr-10"></mat-spinner>
                            <input dh2Slug [model]="graphQL.model" (checkingSlug)="handleCheckingSlug($event)" matInput placeholder="{{ 'APPS.SLUG' | translate }}" formControlName="slug" required>
                            <mat-error>{{ formErrors?.slug }}</mat-error>
                        </mat-form-field>
                    </div>
                </div>
            </form>
        </div>
        <div mat-dialog-actions>
            
            <button mat-raised-button
                    type="submit"
                    form="formFamilyDialogDetail"
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
export class FamilyDialogComponent implements OnInit
{
    fg: FormGroup;
    lang: Lang;
    formErrors: any = {};
    graphQL = graphQL;
    loadingSlug = false;
    loadingButton = false;
    showSpinner = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<FamilyDialogComponent>,
        private _fb: FormBuilder,
        private _config: ConfigService,
        private _http: HttpService,
        private _validationMessageService: ValidationMessageService
    )
    {
        this.createForm();
    }

    createForm(): void
    {
        this.fg = this._fb.group({
            id: '',
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required]
        });
    }

    ngOnInit(): void
    {
        this.showSpinner = true;
        this._validationMessageService.subscribeForm(this.fg, this.formErrors);
        this.lang = this.data.lang;

        // create family lang
        if (this.data.id)
        {
            const ob$ = this._http
                .apolloClient()
                .watchQuery({
                    fetchPolicy: 'network-only',
                    query: this.graphQL.queryObject,
                    variables: {
                        sql: [{
                            command: 'where',
                            column: `${graphQL.table}.id`,
                            operator: '=',
                            value: this.data.id
                        },
                        {
                            command: 'where',
                            column: `${graphQL.table}.lang_id`,
                            operator: '=',
                            value: this._config.get('base_lang')
                        }]
                    }
                })
                .valueChanges
                .subscribe(({data}) => {
                    ob$.unsubscribe();

                    // instance data
                    this.fg.patchValue(data['coreObject']);

                    // set new lang
                    this.fg.patchValue({
                        lang_id: this.lang.id   // set lang id in form from object with multiple language
                    });

                    this.showSpinner = false;
                });
        }
        // create action
        else {
            // set new lang
            this.fg.patchValue({
                lang_id: this.lang.id   // set lang id in form from object with multiple language
            });

            this.showSpinner = false;
        }
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
                    this._dialogRef.close(res.data.wineCreateFamily);
                });
        }
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
