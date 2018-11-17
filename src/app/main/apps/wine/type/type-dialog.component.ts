import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from './../../../core/services/validation-message.service';
import { HttpService } from '../../../core/services/http.service';
import { graphQL } from './type.graphql';
import { Lang } from '../../admin/admin.models';
import { ConfigService } from '../../../core/services/config.service';
import { Dialog, DialogDecoratorInterface } from '../../../core/decorators/dialog.decorator';

@Dialog()
@Component({
    selector: 'dh2-wine-type-dialog',
    template: `
        <dh2-spinner [show]="showSpinner"></dh2-spinner>
        <h1 mat-dialog-title>
            <mat-icon>bookmarks</mat-icon>
            {{ 'APPS.TYPE' | translate }}
            <dh2-flag-icon class="d-inline ml-40" [lang]="lang" size="22px" [rounded]="true"></dh2-flag-icon>
        </h1>
        <div mat-dialog-content>
            <form id="formTypeDialogDetail" 
                  [formGroup]="fg" 
                  (ngSubmit)="postRecord()">
                
                <input type="hidden" formControlName="id">
                
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
                </div>
            </form>
        </div>
        <div mat-dialog-actions>
            
            <button mat-raised-button
                    type="submit"
                    form="formTypeDialogDetail"
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
export class TypeDialogComponent implements OnInit, DialogDecoratorInterface
{
    fg: FormGroup;
    lang: Lang;
    formErrors: any = {};
    graphQL = graphQL;
    loadingSlug = false;
    loadingButton = false;
    showSpinner = false;

    // dialog decorator
    getObject: Function;

    createForm(): void
    {
        this.fg = this._fb.group({
            id: '',
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required]
        });
    }

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<TypeDialogComponent>,
        private _fb: FormBuilder,
        private _config: ConfigService,
        private _http: HttpService,
        private _validationMessageService: ValidationMessageService
    )
    {
        this.createForm();
    }

    ngOnInit(): void
    {
        this.showSpinner = true;
        this._validationMessageService.subscribeForm(this.fg, this.formErrors);
        this.lang = this.data.lang;

        // create type lang
        if (this.data.id)
        {
            this.getObject();
        }
        else {
            this.fg.patchValue({
                lang_id: this.lang.id // set lang id in form from object with multiple language
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
                    mutation: this.graphQL.mutationCreateObject,
                    variables: {
                        payload: this.fg.value
                    }
                })
                .subscribe(res => {

                    ob$.unsubscribe();
                    this.loadingButton = false;
                    this._dialogRef.close(res.data.wineCreateType);
                });
        }
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
