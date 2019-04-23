import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { graphQL } from './field-value.graphql';

@Component({
    selector: 'dh2-admin-field-value-detail',
    templateUrl: './field-value-detail.component.html',
    animations: fuseAnimations
})
export class FieldValueDetailComponent extends CoreDetailComponent
{
    public objectTranslation = 'ADMIN.VALUE';
    public objectTranslationGender = 'M';
    public field_id: number;
    public enableId = false;

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);

        // set fieldId to be used in template
        this.field_id = this.params['field_id'];

        // set field_id in reactive form
        this.fg.controls['field_id'].setValue(this.field_id);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required],
            field_id: [this.field_id, Validators.required],
            name: ['', Validators.required],
            sort: '',
            featured: false
        });
    }

    getCustomArgumentsGetRecord(args, params): object
    {
        args.sql.push({
            command: 'where',
            column: `${this.graphQL.table}.field_id`,
            operator: '=',
            value: params['field_id']
        });

        return args;
    } 

    handleEnableId(): void
    {
        if (this.fg.controls['id'].disabled) 
        {
            this.fg.controls['id'].enable();
            this.fg.controls['id'].setValidators([Validators.required]);
            this.enableId = true;
        } 
        else 
        {
            this.fg.controls['id'].disable();
            this.fg.controls['id'].setValidators(null);
            this.enableId = false;
        }
    }
}
