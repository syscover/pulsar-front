import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { FieldService } from './field.service';
import { Field, FieldGroup, FieldType, DataType } from './../admin.models';

// custom imports
import { FieldGroupService } from './../field-group/field-group.service';

import * as _ from 'lodash';

@Component({
    selector: 'ps-field-detail',
    templateUrl: 'field-detail.component.html'
})
export class FieldDetailComponent extends CoreDetailComponent implements OnInit {

    private fieldGroups: SelectItem[] = [];
    private fieldTypes: SelectItem[] = [];
    private dataTypes: SelectItem[] = [];

    // paramenters for parent class
    private object: Field = new Field(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form

            // set lang, this type of objects hasn't land_id in your table
            this.fg.patchValue({lang_id: this.lang.id});

            if (this.dataRoute.action === 'create-lang') {
                this.fg.controls['label'].setValue(this.object.labels[this.configService.getConfig('base_lang')]);
                // disabled inputs that hasn't caontaint multi language
                this.disabledForm();

            } else if (this.dataRoute.action === 'edit') {
                this.fg.controls['label'].setValue(this.object.labels[this.lang.id]); // set labels with base lang data

                // disabled elemetns if edit diferent language that base lang
                if (this.lang.id !== this.configService.getConfig('base_lang')) {
                    this.disabledForm();
                }
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: FieldService,
        protected confirmationService: ConfirmationService,
        protected fieldGroupService: FieldGroupService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.fieldGroupService.getRecords() // get fieldGroups
            .subscribe(response => {
                this.fieldGroups = _.map(<FieldGroup[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });

                this.fieldGroups.unshift({ label: 'Select a group', value: '' });
            });

        // get field types
        this.configService.getValue({
                key: 'pulsar.admin.field_types'
            }).subscribe((response) => {
                this.fieldTypes = _.map(<FieldType[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });

                this.fieldTypes.unshift({ label: 'Select a field type', value: '' });
            });

        // get data types
        this.configService.getValue({
                key: 'pulsar.admin.data_types'
            }).subscribe((response) => {
                this.dataTypes = _.map(<DataType[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });

                this.dataTypes.unshift({ label: 'Select a data type', value: '' });
            });

        super.getRecordHasIdParamenter(this.f);
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
}
