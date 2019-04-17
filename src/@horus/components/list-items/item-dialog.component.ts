import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from '@horus/services/validation-message.service';
import { horusConfig } from 'app/horus-config';

@Component({
    selector: 'dh2-item-dialog',
    template: `        
        <h1 mat-dialog-title>
            <mat-icon>list</mat-icon>
            {{ data.title }}
        </h1>
        <div mat-dialog-content>
            <form id="formTypeDialogDetail" 
                  [formGroup]="fg" 
                  (ngSubmit)="postRecord()">
                
                <div fxLayout="column" fxFlex>

                    <ng-container *ngFor="let control of this.data.formControls">
                        <ng-container [ngSwitch]="control.type.split('.')[0]">

                            <div fxLayout="row" *ngSwitchCase="'input'">
                                <mat-form-field [appearance]="horusConfig.fieldAppearance" [class]="control.class ? control.class : 'col-12'">
                                    <mat-label>{{ control.label }}</mat-label>
                                    <input matInput [type]="control.type.split('.')[1]" [formControlName]="control.name" [required]="control.required">
                                    <mat-error>{{ formErrors[control.name] }}</mat-error>
                                </mat-form-field>
                            </div>
                            
                        </ng-container>
                    </ng-container>
                    
                </div>
            </form>
        </div>
        <div mat-dialog-actions>
            
            <button mat-raised-button
                    type="submit"
                    form="formTypeDialogDetail"
                    class="mat-accent mr-16"
                    [disabled]="fg.pristine || fg.invalid">
                {{ 'ITEMS.SAVE' | translate }}
            </button>
            
            <button mat-raised-button 
                    [mat-dialog-close]="false">
                {{ 'ITEMS.CANCEL' | translate }}
            </button>
            
        </div>
    `
})
export class ItemDialogComponent implements OnInit
{
    fg: FormGroup;
    oldObject: object;

    formErrors: any = {};
    horusConfig = horusConfig;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<ItemDialogComponent>,
        private _fb: FormBuilder,
        private _validationMessageService: ValidationMessageService
    )
    {
        this.createForm();
    }

    createForm(): void
    {
        const configControls = {};

        for (const config of this.data.formControls)
        {
            configControls[config['name']] = config['control'];
        }

        // set form group from parent component
        this.fg = this._fb.group(configControls);
    }

    ngOnInit(): void
    {
        this._validationMessageService.subscribeForm(this.fg, this.formErrors);

        // edit link
        if (this.data.object)
        {
            this.oldObject = this.data.object;
            this.fg.setValue(this.data.object);
        }
    }

    postRecord(): void
    {
        if (this.fg.valid)
        {
            this._dialogRef.close({
                oldObject: this.oldObject,
                fg: this.fg
            });
        }
    }
}
