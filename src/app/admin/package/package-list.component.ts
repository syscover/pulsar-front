import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { PackageService } from './package.service';
import { Package } from '../admin.models';

@Component({
    selector: 'app-package-list',
    templateUrl: './package-list.component.html'
})
export class PackageListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name', 'root'
    ];
    objects: Package[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: PackageService
    ) {
        super(injector);
    }

}
