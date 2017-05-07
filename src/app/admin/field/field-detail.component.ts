import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { FieldService } from './field.service';
import { Field, FieldGroup } from './../admin.models';

// custom imports
import { FieldGroupService } from './../field-group/field-group.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-field-detail',
    templateUrl: 'field-detail.component.html'
})
export class FieldDetailComponent extends CoreDetailComponent implements OnInit {

    private fieldGroups: SelectItem[] = [];

    // paramenters for parent class
    private object: Field = new Field(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: FieldService,
        protected fieldGroupService: FieldGroupService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.createForm(); // create form

        this.fieldGroupService.getRecords() // get fieldGroups
            .subscribe(response => {
                this.fieldGroups = _.map(<FieldGroup[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });

                this.fieldGroups.unshift({ label: 'Select a group', value: '' });
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
        });
    }

}
