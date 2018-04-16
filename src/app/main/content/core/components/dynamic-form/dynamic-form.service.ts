import { Injectable, Injector } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from './../../services/http.service';
import { FieldGraphQLService } from './../../../apps/admin/field/field-graphql.service';
import { ValidationMessageService } from './../../services/validation-message.service';
import { Field } from './../../../apps/admin/admin.models';
import { environment } from './../../../../../../environments/environment.prod';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DynamicFormService extends HttpService
{
    form: FormGroup;
    fieldsLoaded = new Subject();
    private fields: Field[];

    constructor(
        protected injector: Injector,
        private graphQL: FieldGraphQLService,
        private fb: FormBuilder,
        private validationMessageService: ValidationMessageService
    ) { 
        super(injector);
    }

    // request to gel all fields from field_group_id
    instance(fg: FormGroup, fieldGroupId: number, values: any)
    {
        if (fieldGroupId) 
        {
            this.reset();

            // get custom fields from field group
            const ob$ = this
                .apolloClient()
                .watchQuery({
                    fetchPolicy: 'network-only',
                    query: this.graphQL.queryObjects,
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
                        customFields.addControl(field.name, new FormControl(null, field.required ? Validators.required : undefined));
                    }

                    // check that have values
                    if (values) 
                    {
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

                    // this.validationMessageService.subscribeForm(this.form, formErrors);

                    // execute observable
                    this.fieldsLoaded.next(this.fields);
                });
        } 
        else 
        {
            // reset fields
            this.reset();
        }
    }

    reset()
    {
        // reset fields
        this.fields = undefined;

        // remove customFields control if exist
        if (this.form && this.form.get('customFields')) this.form.removeControl('customFields');

        // execute observable
        this.fieldsLoaded.next(this.fields);
    }
}
