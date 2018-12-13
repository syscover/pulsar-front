import { Injectable, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './../../services/http.service';
import { graphQL } from './../../../apps/admin/field/field.graphql';
import { ValidationMessageService } from './../../services/validation-message.service';
import { Field } from './../../../apps/admin/admin.models';
import { environment } from 'environments/environment';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DynamicFormService extends HttpService
{
    form: FormGroup;
    fieldsLoaded = new Subject();
    private fields: Field[];

    constructor(
        protected injector: Injector,
        private fb: FormBuilder,
        private validationMessageService: ValidationMessageService
    ) { 
        super(injector);
    }

    // request to gel all fields from field_group_id
    instance(formGroup: FormGroup, fieldGroupId: number, values: any, errors: any): void
    {
        if (fieldGroupId) 
        {
            this.reset(formGroup);

            // get custom fields from field group
            const ob$ = this
                .apolloClient()
                .watchQuery({
                    fetchPolicy: 'network-only',
                    query: graphQL.queryObjects,
                    variables: {
                        sql: [
                            {
                                'command': 'where',
                                'column': 'admin_field.field_group_id',
                                'operator': '=',
                                'value': fieldGroupId
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
                .valueChanges
                .subscribe(({data}) => {
                    ob$.unsubscribe();
                    if (environment.debug) console.log('DEBUG - data response from get custom fields: ', data);

                    this.fields = data['coreObjects'];

                    // add FormControl to FormGroup
                    const customFields = this.fb.group({});
                    for (const field of this.fields)
                    {
                        const fc = new FormControl(null, field.required ? Validators.required : undefined);

                        customFields.addControl(field.name, fc);
                        this.validationMessageService.addControl('custom_fields.' + field.name, fc, errors);
                    }

                    // check that have values
                    if (values) 
                    {
                        // instance customs fields with values values
                        customFields.patchValue(values);
                    }

                    // remove custom_fields control if exist
                    if (formGroup.get('custom_fields')) formGroup.removeControl('custom_fields');

                    // add new custom_fields control
                    formGroup.addControl('custom_fields', customFields);

                    // execute observable
                    this.fieldsLoaded.next(this.fields);
                });
        } 
        else 
        {
            // reset fields
            this.reset(formGroup);
        }
    }

    private reset(formGroup: FormGroup): void
    {
        // reset fields
        this.fields = undefined;

        // remove custom_fields control if exist
        if (this.form && this.form.get('custom_fields')) this.form.removeControl('custom_fields');

        // execute observable
        this.fieldsLoaded.next(this.fields);
    }
}
