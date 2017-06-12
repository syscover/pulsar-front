import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';
import { ActionService } from './action.service';

@Component({
    selector: 'ps-action-list',
    templateUrl: './action-list.component.html'
})
export class ActionListComponent extends CoreListComponent {

    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected objectService: ActionService,
    ) {
        super(injector, objectService);
    }
}
