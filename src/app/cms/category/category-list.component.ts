import { Component, Injector, HostBinding } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { CategoryGraphQLService } from './category-graphql.service';

@Component({
    selector: 'ps-category-list',
    templateUrl: './category-list.component.html'
})
export class CategoryListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'category.id', 'category.name', 'lang.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: CategoryGraphQLService,
    ) {
        super(injector, graphQL);
    }
}
