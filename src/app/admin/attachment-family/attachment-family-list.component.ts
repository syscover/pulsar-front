import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { AttachmentFamilyService } from './attachment-family.service';
import { Package } from '../admin.models';

@Component({
    selector: 'ps-attachment-family-list',
    templateUrl: './attachment-family-list.component.html'
})
export class AttachmentFamilyListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];
    objects: Package[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: AttachmentFamilyService
    ) {
        super(injector);
    }
}
