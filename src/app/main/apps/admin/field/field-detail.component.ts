import { Component, Injector } from '@angular/core';
import { Params } from '@angular/router';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { graphQL } from './field.graphql';
import { FieldGroup, FieldType, DataType } from '../admin.models';

@Component({
    selector: 'dh2-admin-field-detail',
    templateUrl: 'field-detail.component.html',
    animations: fuseAnimations
})
export class FieldDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'APPS.FIELD_GROUP';
    objectTranslationGender = 'M';
    fieldGroups: FieldGroup[] = [];
    fieldTypes: FieldType[] = [];
    dataTypes: DataType[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            field_group_id: ['', Validators.required],
            lang_id: ['', Validators.required],
            label: ['', Validators.required],
            name: ['', Validators.required],
            field_type_id: ['', Validators.required],
            data_type_id: ['', Validators.required],
            required: false,
            sort: '',
            max_length: '',
            pattern: '',
            label_class: '',
            component_class: ''
        });
    }

    disabledForm(): void
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

    afterSetData(): void
    {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') 
        {
            // set lang, this type of objects hasn't land_id in your table
            this.fg.patchValue({lang_id: this.lang.id});

            if (this.dataRoute.action === 'create-lang') 
            {
                // set label field
                this.fg.controls['label'].setValue(
                    this.object.labels.find((el) => {
                        return el['id'] === this.baseLang.id;
                    })['value']
                );

                // disabled inputs that hasn't containt multi language
                this.disabledForm();
            } 
            else if (this.dataRoute.action === 'edit') 
            {
                // set label field
                this.fg.controls['label'].setValue(
                    this.object.labels.find((el) => {
                        return el['id'] === this.lang.id;
                    })['value']
                );

                // disabled elements if edit diferent language that base lang
                if (this.lang.id !== this.baseLang.id) this.disabledForm();
            }
        }
    }

    argumentsRelationsObject(): object
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
    getCustomArgumentsGetRecord(args: object, params: Params): object
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

    setRelationsData(data: any): void
    {
        // set field groups
        this.fieldGroups = data.adminFieldGroups;

        // set fields types
        this.fieldTypes = data.coreConfigFieldTypes;

        // set data types
        this.dataTypes = data.coreConfigDataTypes;
    }
}
