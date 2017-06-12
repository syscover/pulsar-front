import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { FieldGroupService } from './field-group.service';
import { FieldGroup } from '../admin.models';

@Component({
    selector: 'ps-field-group-list',
    templateUrl: './field-group-list.component.html'
})
export class FieldGroupListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected objectService: FieldGroupService,
    ) {
        super(injector, objectService);
    }
}
