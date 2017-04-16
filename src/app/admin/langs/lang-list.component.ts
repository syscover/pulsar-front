import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { LangService } from './lang.service';
import { Lang } from '../admin.models';

import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'app-lang-list',
    templateUrl: './lang-list.component.html'
})
export class LangListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];
    objects: Lang[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected injector: Injector,
        protected objectService: LangService
    ) {
        super(injector);
    }

}
