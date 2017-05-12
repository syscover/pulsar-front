import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/primeng';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { FieldValueService } from './field-value.service';
import { FieldValue } from './../admin.models';

// custom imports
import { FieldGroupService } from './../field-group/field-group.service';

import * as _ from 'lodash';

@Component({
    selector: 'ps-field-value-detail',
    templateUrl: 'field-value-detail.component.html'
})
export class FieldValueDetailComponent extends CoreDetailComponent implements OnInit {

    private field_id: number;

    // paramenters for parent class
    private object: FieldValue = new FieldValue(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form

            if (this.dataRoute.action === 'create-lang') {
                //this.fg.controls['label'].setValue(this.object.labels[this.configService.getConfig('base_lang')]);
            } else if (this.dataRoute.action === 'edit') {
                //this.fg.controls['label'].setValue(this.object.labels[this.lang.id]); // set labels with base lang data
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: FieldValueService,
        protected confirmationService: ConfirmationService,
        protected fieldGroupService: FieldGroupService
    ) {
        super(injector);
        this.field_id = this.route.snapshot.params['field'];
    }

    ngOnInit() {
        this.createForm(); // create form
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required ],
            field_id: ['', Validators.required ],
            name: ['', Validators.required ],
            sort: '',
            featured: ''
        });
    }

    handleEnableId($event) {

    }

}
