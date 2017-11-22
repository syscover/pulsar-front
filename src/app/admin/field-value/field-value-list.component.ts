import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { FieldValueGraphQLService } from './field-value-graphql.service';
import { LazyLoadEvent } from 'primeng/primeng';

@Component({
    selector: 'ps-field-value-list-value',
    templateUrl: './field-value-list.component.html'
})
export class FieldValueListComponent extends CoreListComponent {

    field_id: number;

    columnsSearch: string[] = [
        'object_id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: FieldValueGraphQLService,
    ) {
        super(injector, graphQL);
        this.field_id = this.params['field_id']; // set field id to be used in view and loadDadaTableLazy method
    }

    getRecords(event: LazyLoadEvent) {
        // add parameters before call loadDadaTableLazy to filter records
        super.getRecords(event, [
            {
                'command': 'where',
                'column': 'lang_id',
                'operator': '=',
                'value': this.baseLang
            },
            {
                'command': 'where',
                'column': 'admin_field_value.field_id',
                'operator': '=',
                'value': this.field_id
            }]
        );
    }
}
