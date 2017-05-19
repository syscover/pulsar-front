import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { AttachmentMimeService } from './attachment-mime.service';
import { Package } from '../admin.models';

@Component({
    selector: 'ps-attachment-mime-list',
    templateUrl: './attachment-mime-list.component.html'
})
export class AttachmentMimeListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name', 'mime'
    ];
    objects: Package[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: AttachmentMimeService
    ) {
        super(injector);
    }
}
