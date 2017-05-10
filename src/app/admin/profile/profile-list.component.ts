import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ProfileService } from './profile.service';
import { Profile } from '../admin.models';

@Component({
    selector: 'app-profile-list',
    templateUrl: './profile-list.component.html'
})
export class ProfileListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];
    objects: Profile[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: ProfileService
    ) {
        super(injector);
    }
}
