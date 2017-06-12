import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { FieldService } from './field.service';
import { Field } from '../admin.models';

@Component({
    selector: 'ps-field-list',
    templateUrl: './field-list.component.html'
})
export class FieldListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected objectService: FieldService,
    ) {
        super(injector, objectService);
    }
}
