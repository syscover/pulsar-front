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
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: FieldValueGraphQLService,
    ) {
        super(injector, graphQL);
        this.field_id = this.params['field']; // set field id to be used in view and loadDadaTableLazy method
    }

    loadDadaTableLazyGraphQL(event: LazyLoadEvent) {
        // add parameters before call loadDadaTableLazy to filter records
        super.loadDadaTableLazyGraphQL(event, [
            {
                'command': 'where',
                'column': 'lang_id',
                'operator': '=',
                'value': this.baseLang
            },
            {
                'command': 'where',
                'column': 'field_id',
                'operator': '=',
                'value': this.field_id
            }]
        );
    }
}
