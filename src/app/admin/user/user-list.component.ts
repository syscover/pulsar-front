import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { UserService } from './user.service';
import { Resource } from '../admin.models';

@Component({
    selector: 'ps-user-list',
    templateUrl: './user-list.component.html'
})
export class UserListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name', 'profile.name'
    ];

    constructor(
        protected injector: Injector,
        protected objectService: UserService,
    ) {
        super(injector, objectService);
    }
}
