import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from './../../../core/services/validation-message.service';
import { Lang } from '../../admin/admin.models';


@Component({
    selector: 'dh2-wine-percentage-grape-dialog',
    template: `        
        <h1 mat-dialog-title>
            <mat-icon>hdr_weak</mat-icon>
            {{ 'WINE.GRAPE' | translate }} 
            <dh2-flag-icon class="d-inline ml-40" [lang]="lang" size="22px" [rounded]="true"></dh2-flag-icon>
        </h1>
        <div mat-dialog-content>
            <form id="formGrapeDialogDetail" 
                  [formGroup]="fg" 
                  (ngSubmit)="postRecord()">

                <input type="hidden" formControlName="id">
                
                <div fxLayout="column" fxFlex>
                    <div fxLayout="row">
                        <mat-form-field class="col-12">
                            <input matInput placeholder="{{ 'APPS.NAME' | translate }}" formControlName="name" readonly>
                            <mat-error>{{ formErrors?.name }}</mat-error>
                        </mat-form-field>
                    </div>

                    <div fxLayout="row">
                        <mat-form-field class="col-6">
                            <input matInput placeholder="{{ 'APPS.PERCENTAGE' | translate }}" formControlName="percentage" type="number" required>
                            <span matSuffix>%</span>
                            <mat-error>{{ formErrors?.percentage }}</mat-error>
                        </mat-form-field>
                    </div>
                </div>
            </form>
        </div>
        <div mat-dialog-actions>
            
            <button mat-raised-button
                    type="submit"
                    form="formGrapeDialogDetail"
                    class="mat-accent mr-16"
                    [disabled]="fg.pristine || loadingButton" 
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
export class PercentageGrapeDialogComponent implements OnInit
{
    fg: FormGroup;
    lang: Lang;
    formErrors: any = {};
    loadingButton = false;

    // dialog decorator
    getObject: Function;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<PercentageGrapeDialogComponent>,
        private _fb: FormBuilder,
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
            percentage: ['', Validators.required]
        });
    }

    ngOnInit(): void
    {
        this._validationMessageService.subscribeForm(this.fg, this.formErrors);
        this.lang = this.data.lang;
        this.fg.patchValue(this.data.grape);
    }

    postRecord(): void
    {
        if (this.fg.valid)
        {
            this._dialogRef.close(this.fg.value);
        }
    }
}
