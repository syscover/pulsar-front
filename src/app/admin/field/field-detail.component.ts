import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { FieldGraphQLService } from './field-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { Field, FieldType, FieldGroup, DataType } from './../admin.models';

import * as _ from 'lodash';

@Component({
    selector: 'ps-field-detail',
    templateUrl: 'field-detail.component.html'
})
export class FieldDetailComponent extends CoreDetailComponent {

    fieldGroups: SelectItem[] = [];
    fieldTypes: SelectItem[] = [];
    dataTypes: SelectItem[] = [];

    // overwirte method and property in parent class
    object: Field = new Field(); // set empty object
    customCallback: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response; // function to set custom data
            this.fg.patchValue(this.object); // set values of form

            // set lang, this type of objects hasn't land_id in your table
            this.fg.patchValue({lang_id: this.lang.id});

            if (this.dataRoute.action === 'create-lang') {

                // set label field
                this.fg.controls['label'].setValue(
                    this.object.labels.find((el) => {
                        return el['id'] === this.baseLang
                    })['value']
                );

                // disabled inputs that hasn't caontaint multi language
                this.disabledForm();

            } else if (this.dataRoute.action === 'edit') {

                // set label field
                this.fg.controls['label'].setValue(
                    this.object.labels.find((el) => {
                        return el['id'] === this.lang.id;
                    })['value']
                );

                // disabled elemetns if edit diferent language that base lang
                if (this.lang.id !== this.baseLang) {
                    this.disabledForm();
                }
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected graphQL: FieldGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            field_group_id: ['', Validators.required ],
            lang_id: ['', Validators.required],
            label: ['', Validators.required ],
            name: ['', Validators.required ],
            field_type_id: ['', Validators.required ],
            data_type_id: ['', Validators.required ],
            required: '',
            sort: '',
            max_length: '',
            pattern: '',
            label_class: '',
            component_class: ''
        });
    }

    disabledForm() {
        this.fg.controls['field_group_id'].disable();
        this.fg.controls['name'].disable();
        this.fg.controls['field_type_id'].disable();
        this.fg.controls['data_type_id'].disable();
        this.fg.controls['required'].disable();
        this.fg.controls['sort'].disable();
        this.fg.controls['max_length'].disable();
        this.fg.controls['pattern'].disable();
        this.fg.controls['label_class'].disable();
        this.fg.controls['component_class'].disable();
    }

    getArgsToGetRecord(params: Params): any {
        let args = {
            sql: [{
                command: 'where',
                column: 'field.id',
                operator: '=',
                value: params['id']
            }],
            configFieldTypes: {
                key: 'pulsar.admin.field_types'
            },
            configDataTypes: {
                key: 'pulsar.admin.data_types'
            }
        };

        return args;
    }

    getGraphQLDataRelationsToCreateObject() {
        this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.graphQL.queryRelationsObject,
                variables: {
                    configFieldTypes: {
                        key: 'pulsar.admin.field_types'
                    },
                    configDataTypes: {
                        key: 'pulsar.admin.data_types'
                    }
                }
            })
            .subscribe(({data}) => {
                this.setDataRelationsObject(data);
            });
    }

    setDataRelationsObject(data: any) {
        // set field groups
        this.fieldGroups = _.map(<FieldGroup[]>data['adminFieldGroups'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.fieldGroups.unshift({ label: 'Select a group', value: '' });

        // set fields types
        this.fieldTypes = _.map(<FieldType[]>data['coreConfigFieldTypes'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.fieldTypes.unshift({ label: 'Select a field type', value: '' });

        // set data types
        this.dataTypes = _.map(<DataType[]>data['coreConfigDataTypes'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.dataTypes.unshift({ label: 'Select a data type', value: '' });
    }
}
