import { Component, OnInit, OnChanges, Input, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
import { Field, Lang, FieldValue } from './../../../apps/admin/admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-dynamic-form',
    template: `
        <ng-container *ngIf="formGroup?.get('custom_fields')">
            <div [formGroup]="formGroup.get('custom_fields')">
                
                <ng-container *ngFor="let field of fields">
                    <ng-container [ngSwitch]="field?.field_type_id">

                        <div fxLayout="row" *ngSwitchCase="'text'">
                            <mat-form-field [class]="field.component_class ? field.component_class : 'col-12'">
                                <input matInput placeholder="{{ field | getFieldLabel:lang }}" [formControlName]="field.name" [required]="field.required">
                                <mat-error>{{ errors['custom_fields.' + field.name] }}</mat-error>
                            </mat-form-field>
                        </div>

                        <div fxLayout="row" *ngSwitchCase="'number'">
                            <mat-form-field [class]="field.component_class ? field.component_class : 'col-6 col-md-4'">
                                <input type="number" matInput placeholder="{{ field | getFieldLabel:lang }}" [formControlName]="field.name" [required]="field.required">
                                <mat-error>{{ errors['custom_fields.' + field.name] }}</mat-error>
                            </mat-form-field>
                        </div>

                        <div fxLayout="row" *ngSwitchCase="'select'">
                            <mat-form-field [class]="field.component_class ? field.component_class : 'col-12 col-md-6'">
                                <mat-select placeholder="{{ field | getFieldLabel:lang }}" [formControlName]="field.name" [required]="field.required">
                                    <mat-option>{{ 'APPS.NONE.M' | translate }}</mat-option>
                                    <mat-option *ngFor="let value of field.values | getSelectValues:lang" [value]="value.id">{{ value.name }}</mat-option>
                                </mat-select>
                                <mat-error>{{ errors['custom_fields.' + field.name] }}</mat-error>
                            </mat-form-field>
                        </div>

                        <div fxLayout="row" *ngSwitchCase="'select-multiple'">
                            <mat-form-field [class]="field.component_class ? field.component_class : 'col-12 col-md-6'">
                                <mat-select placeholder="{{ field | getFieldLabel:lang }}" [formControlName]="field.name" [required]="field.required" multiple>
                                    <mat-option *ngFor="let value of field.values | getSelectValues:lang" [value]="value.id">{{ value.name }}</mat-option>
                                </mat-select>
                                <mat-error>{{ errors['custom_fields.' + field.name] }}</mat-error>
                            </mat-form-field>
                        </div>

                        <div fxLayout="row" *ngSwitchCase="'wysiwyg'">
                            <dh2-froala [formControlName]="field.name"
                                        [class]="field.component_class ? field.component_class : 'col-12'"
                                        placeholder="{{ field | getFieldLabel:lang }}"
                                        [heightMin]="200"></dh2-froala>
                            <mat-error>{{ errors['custom_fields.' + field.name] }}</mat-error>
                        </div>

                        <div fxLayout="row" *ngSwitchCase="'checkbox'">
                            <div [class]="field.component_class ? field.component_class + ' py-20' : 'col-12 col-md-2 py-20'">
                                <mat-checkbox [formControlName]="field.name">{{ field | getFieldLabel:lang }}</mat-checkbox>
                                <mat-error>{{ errors['custom_fields.' + field.name] }}</mat-error>
                            </div>
                        </div>

                        <div fxLayout="row" *ngSwitchCase="'datetime-local'">
                            <mat-form-field [class]="field.component_class ? field.component_class : 'col-12 col-md-4'">
                                <input type="datetime-local" matInput placeholder="{{ field | getFieldLabel:lang }}" [formControlName]="field.name" [required]="field.required">
                                <mat-error>{{ errors['custom_fields.' + field.name] }}</mat-error>
                            </mat-form-field>
                        </div>

                        <div *ngSwitchDefault>Error field {{ field.field_type_id }} nor implemented</div>
                    </ng-container>
                </ng-container>

            </div>
        </ng-container>
    `
})

export class DynamicFormComponent implements OnInit, OnChanges 
{
    @Input() formGroup: FormGroup;
    @Input() errors: any = {};
    @Input() fieldGroupId: number;
    @Input() values: any;
    @Input() lang: string;

    /*****************************************************************************
    * This variable allows controlling the start of the query of the custom fields 
    * within the dh2-dynamic-form component and controlling synchronous calls. 
    * For example to avoid failures in the JWT
    * You can see a example in product-detail.component.ts
    *****************************************************************************/
    @Input() start = true; // this flag allow

    fields: Field[];
    private _fieldGroupId: number;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private applicationRef: ApplicationRef,
        private dynamicFormService: DynamicFormService
    ) { }

    ngOnChanges()
    {
        // only instance dynamic forms when change the fieldGroupId
        if (this.fieldGroupId !== this._fieldGroupId && this.start)
        {
            this.dynamicFormService.instance(this.formGroup, this.fieldGroupId, this.values, this.errors);

            // save value to avoid instance dynamicForm if not change fieldGroupId
            this._fieldGroupId = this.fieldGroupId;
        }
    }

    ngOnInit() 
    {
        this.dynamicFormService
            .fieldsLoaded 
            .subscribe((fields: Field[]) => {
                this.fields = fields;
            });
    }
}
