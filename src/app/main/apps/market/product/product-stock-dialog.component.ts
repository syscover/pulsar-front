import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from './../../../core/services/validation-message.service';

@Component({
    selector: 'dh2-product-stock-dialog',
    template: `
        <h1 mat-dialog-title>{{ fg.get('warehouse_name').value }}</h1>
        <div mat-dialog-content>
            <form id="formDetail" [formGroup]="fg">

                <input type="hidden" formControlName="warehouse_id">
                <input type="hidden" formControlName="warehouse_name">
                <input type="hidden" formControlName="product_id">

                <div fxLayout="column" fxFlex>
                    <div fxLayout="row">
                        <mat-form-field class="col-12">
                            <input matInput placeholder="{{ 'MARKET.STOCK' | translate }}" formControlName="stock" type="number">
                            <mat-error>{{ formErrors?.stock }}</mat-error>
                        </mat-form-field>
                    </div>
                    <div fxLayout="row">
                        <mat-form-field class="col-12">
                            <input matInput placeholder="{{ 'MARKET.MINIMUM_STOCK' | translate }}" formControlName="minimum_stock" type="number">
                            <mat-error>{{ formErrors?.minimum_stock }}</mat-error>
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
export class ProductStockDialogComponent implements OnInit
{
    fg: FormGroup;
    formErrors: any = {};

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private dialogRef: MatDialogRef<ProductStockDialogComponent>,
        private fb: FormBuilder,
        private validationMessageService: ValidationMessageService
    ) 
    {
        this.fg = this.fb.group({
            warehouse_id: null,
            warehouse_name: null,
            product_id: null,
            stock: [null, Validators.required],
            minimum_stock: [null, Validators.required]
        });
    }

    ngOnInit(): void
    {
        this.validationMessageService.subscribeForm(this.fg, this.formErrors);
        this.fg.patchValue(this.data.stockData);
    }

    postRecord(): void
    {
        if (this.fg.valid) this.dialogRef.close(this.fg.value);
    }
}
