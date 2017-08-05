import { Component, Injector } from '@angular/core';
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
        // service for parent class
        protected injector: Injector,
        protected graphQL: CategoryGraphQLService,
    ) {
        super(injector, graphQL);
    }
}
