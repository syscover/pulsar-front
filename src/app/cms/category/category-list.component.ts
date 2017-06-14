import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { CategoryService } from './category.service';

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

    constructor(
        // service for parent class
        protected injector: Injector,
        protected objectService: CategoryService,
    ) {
        super(injector, objectService);
    }
}
