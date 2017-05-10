import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { CategoryService } from './category.service';
import { Category } from '../market.models';
import { LangService } from './../../admin/lang/lang.service';
import { Lang } from './../../admin/admin.models';

@Component({
    selector: 'ps-category-list',
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'category.id', 'category.name', 'lang.name'
    ];
    objects: Category[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected langService: LangService,

        // service for parent class
        protected injector: Injector,
        protected objectService: CategoryService,
    ) {
        super(injector);
    }
}
