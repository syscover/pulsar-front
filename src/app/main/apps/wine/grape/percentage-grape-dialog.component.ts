import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from './../../../core/services/validation-message.service';
import { Lang } from './../../admin/admin.models';
import { pulsarConfig } from '../../../pulsar-config';

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
                        <mat-form-field [appearance]="pulsarConfig.fieldAppearance" class="col-12">
                            <mat-label>{{ 'APPS.NAME' | translate }}</mat-label>
                            <input matInput formControlName="name" readonly>
                            <mat-error>{{ formErrors?.name }}</mat-error>
                        </mat-form-field>
                    </div>

                    <div fxLayout="row">
                        <mat-form-field [appearance]="pulsarConfig.fieldAppearance" class="col-6">
                            <mat-label>{{ 'APPS.PERCENTAGE' | translate }}</mat-label>
                            <input matInput formControlName="percentage" type="number" required>
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
export class PercentageGrapeDialogComponent implements OnInit
{
    fg: FormGroup;
    lang: Lang;
    formErrors: any = {};
    loadingButton = false;
    pulsarConfig = pulsarConfig;

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
