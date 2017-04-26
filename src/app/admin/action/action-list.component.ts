import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ActionService } from './action.service';
import { Action } from '../admin.models';

@Component({
    selector: 'ps-action-list',
    templateUrl: './action-list.component.html'
})
export class ActionListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];
    objects: Action[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: ActionService,
    ) {
        super(injector);
    }

}
