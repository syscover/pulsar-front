import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
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

    field_id: number;

    constructor(
        protected injector: Injector,
        protected objectService: FieldValueService,
        protected fieldGroupService: FieldGroupService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        // set fieldId to be used in template
        this.field_id = this.params['field'];
        // set field_id in reactive form
        this.fg.controls['field_id'].setValue(this.field_id);

        super.init();
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
