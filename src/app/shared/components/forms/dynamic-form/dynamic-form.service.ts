import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { CoreService } from './../../../super/core.service';
import { FieldGraphQLService } from './../../../../admin/field/field-graphql.service';
import { Field } from './../../../../admin/admin.models';
import { environment } from './../../../../../environments/environment';

@Injectable()
export class DynamicFormService {

    public form: FormGroup;
    private fields: Field[];

    constructor(
        private graphQL: FieldGraphQLService,
        private objectService: CoreService,
        private fb: FormBuilder
    ) { }

    instance(fieldGroup: number, fg: FormGroup, values: any, f: Function) {

        if (fieldGroup) {
            // get custom fields from field group
            this.objectService
                .proxyGraphQL()
                .watchQuery({
                    query: this.graphQL.queryObjects,
                    variables: {
                        sql: [
                            {
                                'command': 'where',
                                'column': 'admin_field.field_group_id',
                                'operator': '=',
                                'value': fieldGroup
                            },
                            {
                                'command': 'orderBy',
                                'operator': 'asc',
                                'column': 'admin_field.sort'
                            }
                        ],
                        configFieldTypes: {
                            key: 'pulsar-admin.field_types'
                        },
                        configDataTypes: {
                            key: 'pulsar-admin.data_types'
                        }
                    }
                })
                .subscribe(({data}) => {
                    if (environment.debug) console.log('DEBUG - data response from get custom fields: ', data);

                    this.fields = data['coreObjects'];

                    // add FormControl to FormGroup
                    let customFields = this.fb.group({});
                    for (const field of this.fields) {
                        customFields.addControl(field.name, new FormControl(null, field.required ? Validators.required : undefined));
                    }

                    if (values) { // check that have values
                        // instance customs fields with values values
                        customFields.patchValue(values);
                    }

                    // remove customFields control if exist
                    if (fg.get('customFields')) fg.removeControl('customFields');

                    // add new customFields control
                    fg.addControl('customFields', customFields);

                    // set instance form of dynamicsFormService
                    // will be used in dynamic-form.component to assign
                    // custom fields to your form
                    this.form = fg;

                    // execute callback
                    f(this.fields);
                });
        } else {
            // reset fields
            this.fields = undefined;

            // remove customFields control if exist
            if (fg.get('customFields')) fg.removeControl('customFields');

            f(this.fields);
        }
    }
}
