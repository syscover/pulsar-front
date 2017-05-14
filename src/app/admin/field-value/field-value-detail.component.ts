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
                this.fg.patchValue({
                    // set lang id in form from object with multiple language
                    lang_id: this.lang.id
                });
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
        this.field_id = this.params['field'];
    }

    ngOnInit() {
        this.createForm(); // create form
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required ],
            field_id: [this.field_id, Validators.required ],
            name: ['', Validators.required ],
            sort: '',
            featured: ''
        });
    }

    handleEnableId($event) {
        // enable or disable id input
        if (this.fg.controls['id'].disabled) {
            this.fg.controls['id'].enable();
        } else {
            this.fg.controls['id'].disable();
        }
    }
}
