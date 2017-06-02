import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Field } from './../../../admin/admin.models';

import { FieldService } from './../../../admin/field/field.service';

@Injectable()
export class DynamicFormService {

    public form: FormGroup;

    private fields: Field[];

    constructor(
        private fieldService: FieldService
    ) { }

    instance(fg: FormGroup, properties: any, f: Function) {

        if (fg.contains('field_group_id')) {
            this.fieldService.searchRecords({
                'type': 'query',
                'parameters': [
                    {
                        'command': 'where',
                        'column': 'field.field_group_id',
                        'operator': '=',
                        'value': fg.get('field_group_id').value
                    },
                    {
                        'command': 'orderBy',
                        'operator': 'asc',
                        'column': 'field.sort'
                    }
                ]
            }).subscribe(data => {
                // set custom fields
                this.fields = data.data;

                // add FormControl to FormGroup
                for (const field of this.fields) {
                    fg.addControl(field.name, new FormControl('', Validators.required));
                }

                if (properties) { // check that have properties
                    // instance custom values for customs fields
                    fg.patchValue(properties);
                }

                // set form of dynamicsFromService
                // will be used in dynamic-form.component
                this.form = fg;

                // execute callback
                f(this.fields);
            });

        } else {
            this.fields = undefined;
            f(this.fields);
        }
    }
}
