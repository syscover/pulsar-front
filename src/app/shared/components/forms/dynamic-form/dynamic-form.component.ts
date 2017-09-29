import { Component, OnInit, Input, ChangeDetectorRef, ApplicationRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { DynamicFormService } from './dynamic-form.service';
import { Field, Lang, FieldValue } from './../../../../admin/admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'ps-dynamic-form',
    template: `
        <div class="row" [ngSwitch]="field?.field_type_id">

            <ps-input   *ngSwitchCase="'text'"
                        [form]="dynamicFormService.form.get('customFields')"
                        [errors]="errors" 
                        [label]="label" 
                        [name]="field.name" 
                        [class]="field.component_class ? field.component_class : 'col-6'"></ps-input>

            <ps-spinner *ngSwitchCase="'number'"
                        [form]="dynamicFormService.form.get('customFields')"
                        [errors]="errors" 
                        [label]="label" 
                        [name]="field.name" 
                        [min]="0"
                        [class]="field.component_class ? field.component_class : 'col-6'"></ps-spinner>

            <ps-dropdown *ngSwitchCase="'select'" 
                        [form]="dynamicFormService.form.get('customFields')"
                        [errors]="errors"
                        [autoWidth]="false"
                        [options]="options"
                        [name]="field.name"
                        [class]="field.component_class ? field.component_class : 'col-6'"></ps-dropdown>

            <ps-editor  *ngSwitchCase="'wysiwyg'"
                        [form]="dynamicFormService.form.get('customFields')"
                        [errors]="errors" 
                        [label]="label"
                        [name]="field.name"
                        [placeholder]="'Enter here your ' + label"
                        [heightMin]="300"
                        [imageUploadURL]="imageUploadURL"
                        [imageStyles]="imageStyles"
                        [attachmentFamilies]="attachmentFamilies"
                        [class]="field.component_class ? field.component_class : 'col-12'"></ps-editor>

            <div *ngSwitchDefault>Error field {{ field.field_type_id }} nor implemented</div>
        </div>
    `
})

export class DynamicFormComponent implements OnInit {

    @Input() field: Field;
    @Input() errors: Object;
    @Input() lang: string;

    options: SelectItem[] = [];
    label: string;

    constructor(
        private changeDetectorRef: ChangeDetectorRef,
        private applicationRef: ApplicationRef,
        private dynamicFormService: DynamicFormService
    ) { }

    ngOnInit() {
        // get field label
        const labelObj = this.field.labels.find((el) => {
                return el['id'] === this.lang;
            });

        // check if label exist in lang required
        this.label = labelObj ? labelObj['value'] : null;

        if (this.field.field_type_id === 'select') {

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
        }
    }
}
