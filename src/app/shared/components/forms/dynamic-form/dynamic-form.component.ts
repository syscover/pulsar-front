import { Component, OnInit, Input, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

import { DynamicFormService } from './dynamic-form.service';
import { Field, Lang, FieldValue } from './../../../../admin/admin.models';
import { FieldValueService } from './../../../../admin/field-value/field-value.service';

import * as _ from 'lodash';

@Component({
    selector: 'ps-dynamic-form',
    template: `
        <div class="row" [ngSwitch]="field?.field_type_id">

            <ps-input   *ngSwitchCase="'text'"
                        [form]="dynamicFormService.form"
                        [errors]="errors" 
                        [label]="field.labels[lang]" 
                        [name]="field.name" 
                        class="col-sm-12 col-md-4"></ps-input>

            <ps-dropdown *ngSwitchCase="'select'" 
                        [form]="dynamicFormService.form"
                        [errors]="errors"
                        [autoWidth]="false"
                        [options]="options"
                        [name]="field.name"
                        class="col-sm-12 col-md-5"></ps-dropdown>

            <div *ngSwitchDefault>Error</div>
        </div>
    `
})

export class DynamicFormComponent implements OnInit {

    @Input() field: Field;
    @Input() fieldValues: FieldValue[];
    @Input() errors: Object;
    @Input() lang: string;

    options: SelectItem[] = [];

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private applicationRef: ApplicationRef,
        private dynamicFormService: DynamicFormService,
        private fieldValueService: FieldValueService
    ) { }

    ngOnInit() {
        if (this.field.field_type_id === 'select') {

            // filter fields values to discard vlaues
            let fv =  _.filter(this.fieldValues, obj => {
                return (obj.field_id === this.field.id);
            });
            // map filedValues to create SelectItem
            this.options = _.map(fv, obj => {
                return { value: obj.id, label: obj.name };
            });
            this.options.unshift({ label: this.field.labels[this.lang], value: '' });
        }
    }
}
