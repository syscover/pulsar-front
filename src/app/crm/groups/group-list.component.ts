import { Component } from '@angular/core';
import { LazyLoadEvent, DataTable } from 'primeng/primeng';

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
    objects: Group[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        // service for parent class
        private objectService: GroupService
    ) {
        super(
            objectService
        );
    }

}
