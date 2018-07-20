import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { FieldValueGraphQLService } from './field-value-graphql.service';

@Component({
    selector: 'dh2-field-value-detail',
    templateUrl: './field-value-detail.component.html',
    animations: fuseAnimations
})
export class FieldValueDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.VALUE';
    objectTranslationGender = 'M';
    field_id: number;

    constructor(
        protected injector: Injector,
        protected graphQL: FieldValueGraphQLService
    ) {
        super(injector, graphQL);

        // set fieldId to be used in template
        this.field_id = this.params['field_id'];

        // set field_id in reactive form
        this.fg.controls['field_id'].setValue(this.field_id);
    }

    createForm()
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            field_id: [this.field_id, Validators.required],
            name: [null, Validators.required],
            sort: null,
            featured: false
        });
    }

    getCustomArgumentsGetRecord(args, params) 
    {
        args.sql.push({
            command: 'where',
            column: `${this.graphQL.table}.field_id`,
            operator: '=',
            value: params['field_id']
        });

        return args;
    } 

    handleEnableId($event) 
    {
        if (this.fg.controls['id'].disabled) 
        {
            this.fg.controls['id'].enable();
        } 
        else 
        {
            this.fg.controls['id'].disable();
        }
    }
}
