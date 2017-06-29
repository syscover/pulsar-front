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

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: FieldValueGraphQLService,
    ) {
        super(injector, graphQL);
        this.field_id = this.params['field']; // set field id to be used in view and loadDadaTableLazy method
    }

    loadDadaTableLazy(event: LazyLoadEvent, lang: string) {

        // add parameters before call loadDadaTableLazy to filter records
        super.loadDadaTableLazy(event, lang, [{
            'command': 'where',
            'column': 'field_id',
            'operator': '=',
            'value': this.field_id
        }]);
    }
}
