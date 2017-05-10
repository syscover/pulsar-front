import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ResourceService } from './resource.service';
import { Resource } from '../admin.models';

@Component({
    selector: 'ps-resource-list',
    templateUrl: './resource-list.component.html'
})
export class ResourceListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name', 'resource.name'
    ];
    objects: Resource[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: ResourceService,
    ) {
        super(injector);
    }
}
