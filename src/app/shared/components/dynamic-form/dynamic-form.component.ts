import { DynamicFormService } from './dynamic-form.service';
import { Component, OnInit, Input, ComponentFactoryResolver } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';

import { Field, Lang } from './../../../admin/admin.models';

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

    @Input() private field: Field;
    @Input() private errors: Object;
    public options: SelectItem[] = [];

    private lang = 'es';

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private dynamicFormService: DynamicFormService
    ) {}

    ngOnInit() {
        this.dynamicFormService.form.addControl(this.field.name, new FormControl('', Validators.required));

        if (this.field.field_type_id === 'select') {
            
        }
        // load options from table values
     }
}
