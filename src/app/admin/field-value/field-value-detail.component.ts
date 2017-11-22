import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { FieldValueGraphQLService } from './field-value-graphql.service';

import * as _ from 'lodash';

@Component({
    selector: 'ps-field-value-detail',
    templateUrl: 'field-value-detail.component.html'
})
export class FieldValueDetailComponent extends CoreDetailComponent {

    field_id: number;

    constructor(
        protected injector: Injector,
        protected graphQL: FieldValueGraphQLService
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {
        // set fieldId to be used in template
        this.field_id = this.params['field_id'];

        // set field_id in reactive form
        this.fg.controls['field_id'].setValue(this.field_id);

        super.init();
    }

    createForm() {
        this.fg = this.fb.group({
            id: '',
            object_id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required ],
            field_id: [this.field_id, Validators.required ],
            name: ['', Validators.required ],
            sort: '',
            featured: ''
        });
    }

    getCustomArgumentsGetRecord(args, params) {
        args.sql.push({
            command: 'where',
            column: `${this.graphQL.table}.field_id`,
            operator: '=',
            value: params['field_id']
        });

        return args;
    }

    handleEnableId($event) {
        // enable or disable id input
        if (this.fg.controls['object_id'].disabled) {
            this.fg.controls['object_id'].enable();
        } else {
            this.fg.controls['object_id'].disable();
        }
    }
}
