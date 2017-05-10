import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { FieldService } from './field.service';
import { Field, Lang } from '../admin.models';
import { LangService } from './../lang/lang.service';

@Component({
    selector: 'ps-field-list',
    templateUrl: './field-list.component.html'
})
export class FieldListComponent extends CoreListComponent {

    activatedLangs: Lang[];

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];
    objects: Field[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected langService: LangService,

        // service for parent class
        protected injector: Injector,
        protected objectService: FieldService,
    ) {
        super(injector);
    }
}
