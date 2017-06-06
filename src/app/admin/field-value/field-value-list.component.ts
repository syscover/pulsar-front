import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { FieldValueService } from './field-value.service';
import { Field} from '../admin.models';

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
    objects: Field[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        // service for parent class
        protected injector: Injector,
        protected objectService: FieldValueService,
    ) {
        super(injector);
        this.baseUri = objectService.baseUri;
        this.field_id = this.params['field']; // set field id to be used in view and loadDadaTableLazy method
    }

    loadDadaTableLazy(event: LazyLoadEvent, f: Function, lang: string) {

        // add parameters before call loadDadaTableLazy to filter records
        super.loadDadaTableLazy(event, f, lang, [{
            'command': 'where',
            'column': 'field_id',
            'operator': '=',
            'value': this.field_id
        }]);
    }
}
