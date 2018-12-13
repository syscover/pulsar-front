import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './field-value.graphql';

@Component({
    selector: 'dh2-field-value-list',
    templateUrl: './field-value-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class FieldValueListComponent extends CoreListComponent 
{
    objectTranslation = 'ADMIN.VALUE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_field_value.id', 'admin_field_value.name'];
    displayedColumns = ['admin_field_value.id', 'admin_field_value.name', 'translations', 'actions'];
    field_id: number;
    filters = [
        {'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang},
        {'command': 'where', 'column': 'admin_field_value.field_id', 'operator': '=', 'value': this.params['field_id']}
    ];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    
        // set field id to be used to reference field to create o edit object
        this.field_id = this.params['field_id'];
    }
}
