import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { GroupService } from './group.service';
import { Group } from '../crm.models';

@Component({
    selector: 'ps-group-list',
    templateUrl: './group-list.component.html'
})
export class GroupListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected objectService: GroupService
    ) {
        super(injector, objectService);
    }
}
