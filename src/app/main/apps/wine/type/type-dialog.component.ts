import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from './../../../core/services/validation-message.service';
import { graphQL } from './type.graphql';

@Component({
    selector: 'dh2-wine-type-dialog',
    template: `
        <h1 mat-dialog-title>{{ 'WINE.TYPE' | translate }}</h1>
        <div mat-dialog-content>
            <form id="formDetail" [formGroup]="fg">
                <div fxLayout="column" fxFlex>
                    <div fxLayout="row wrap">
                        <mat-form-field class="col-12 col-md-4">
                            <input matInput placeholder="{{ 'APPS.ID' | translate }}" formControlName="id">
                        </mat-form-field>
                        <!--<dh2-flag-icon class="col-12 offset-md-1 col-md-4" [lang]="lang" width="30px" *fuseIfOnDom [@animate]="{value:'*',params:{delay:'100ms',x:'25px'}}"></dh2-flag-icon>-->
                    </div>

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
            <button mat-raised-button class="mat-accent mr-16" (click)="postRecord()" cdkFocusInitial>{{ 'APPS.SAVE' | translate }}</button>
            <button mat-raised-button [mat-dialog-close]="false">{{ 'APPS.CANCEL' | translate }}</button>
        </div>
    `
})
export class TypeDialogComponent implements OnInit
{
    fg: FormGroup;
    formErrors: any = {};
    graphQL = graphQL;
    loadingSlug = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<TypeDialogComponent>,
        private fb: FormBuilder,
        private validationMessageService: ValidationMessageService
    ) 
    {
        this.createForm();
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}, Validators.required],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            slug: [null, Validators.required]
        });
    }

    ngOnInit(): void
    {
        this.validationMessageService.subscribeForm(this.fg, this.formErrors);
    }

    postRecord(): void
    {
        if (this.fg.valid) this.dialogRef.close(this.fg.value);
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
