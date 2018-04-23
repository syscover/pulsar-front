import { Component, Injector } from '@angular/core';
import { Params } from '@angular/router';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { FieldGraphQLService } from './field-graphql.service';
import { Field, FieldGroup, FieldType, DataType } from './../admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-field-detail',
    templateUrl: 'field-detail.component.html',
    animations: fuseAnimations
})
export class FieldDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'ADMIN.FIELD_GROUP';
    objectTranslationGender = 'M';
    fieldGroups: FieldGroup[] = [];
    fieldTypes: FieldType[] = [];
    dataTypes: DataType[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: FieldGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            field_group_id: [null, Validators.required],
            lang_id: [null, Validators.required],
            label: [null, Validators.required],
            name: [null, Validators.required],
            field_type_id: [null, Validators.required],
            data_type_id: [null, Validators.required],
            required: false,
            sort: null,
            max_length: null,
            pattern: null,
            label_class: null,
            component_class: null
        });
    }

    disabledForm() 
    {
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

    afterSetData() 
    {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') 
        {
            // set lang, this type of objects hasn't land_id in your table
            this.fg.patchValue({lang_id: this.lang.id});

            if (this.dataRoute.action === 'create-lang') 
            {
                // set label field
                this.fg.controls['label'].setValue(
                    this.object['labels'].find((el) => {
                        return el['id'] === this.baseLang;
                    })['value']
                );

                // disabled inputs that hasn't containt multi language
                this.disabledForm();
            } 
            else if (this.dataRoute.action === 'edit') 
            {
                // set label field
                this.fg.controls['label'].setValue(
                    this.object['labels'].find((el) => {
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

    argumentsRelationsObject(): Object 
    {
        const configFieldTypes = {
            key: 'pulsar-admin.field_types'
        };

        const configDataTypes = {
            key: 'pulsar-admin.data_types'
        };

        const sqlFieldGroup = [
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_field_group.name'
            }
        ];

        return {
            configFieldTypes,
            configDataTypes,
            sqlFieldGroup
        };
    }

    // overwrite this method for not implement lang_id property in aguments
    // field object has translations in field name in json format
    getCustomArgumentsGetRecord(args: Object, params: Params): any 
    {
        return Object.assign({}, {
            sql: [{
                command: 'where',
                column: 'admin_field.id',
                operator: '=',
                value: params['id']
            }]},
            this.argumentsRelationsObject()
        );
    }

    setRelationsData(data: any) 
    {
        // set field groups
        this.fieldGroups = data.adminFieldGroups;

        // set fields types
        this.fieldTypes = data.coreConfigFieldTypes;

        // set data types
        this.dataTypes = data.coreConfigDataTypes;
    }
}
