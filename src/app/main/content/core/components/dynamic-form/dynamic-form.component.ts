import { Component, OnInit, OnChanges, Input, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DynamicFormService } from './dynamic-form.service';
import { Field, Lang, FieldValue } from './../../../apps/admin/admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-dynamic-form',
    template: `
        <ng-container *ngIf="dynamicFormService.form?.get('customFields')">
            <div [formGroup]="dynamicFormService.form.get('customFields')">
                
                <ng-container *ngFor="let field of fields">
                    <ng-container [ngSwitch]="field?.field_type_id">

                        <div fxLayout="row" *ngSwitchCase="'text'">
                            <mat-form-field [class]="field.component_class ? field.component_class : 'col-12'">
                                <input matInput placeholder="{{ field | getFieldLabel:lang }}" [formControlName]="field.name" [required]="field.required">
                                
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
    @Input() fieldGroupId: number;
    
    @Input() values: any;
    @Input() lang: string;

    fields: Field[];
    options: any[] = [];
    private _fieldGroupId: number;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private applicationRef: ApplicationRef,
        private dynamicFormService: DynamicFormService
    ) { }

    ngOnChanges()
    {
        if (this.fieldGroupId !== this._fieldGroupId)
        {
            this.dynamicFormService.instance(this.formGroup, this.fieldGroupId, this.values);

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

            

        

        /* if (
            this.field.field_type_id === 'select' ||
            this.field.field_type_id === 'select-multiple'
        ) {

            // filter fields values by lang
            let fv = _.filter(this.field.values, obj => {
                return (obj.lang_id === this.lang);
            });

            // sort values
            fv = _.sortBy(fv, 'sort');

            // map filedValues to create SelectItem
            this.options = _.map(fv, obj => {
                return { value: obj.id, label: obj.name };
            });

            // set label value
            this.options.unshift({
                label: this.label,
                value: ''
            });
        } */
    }
}
