import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './category.graphql';

@Component({
    selector: 'dh2-forem-category-list',
    templateUrl: './category-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class CategoryListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.CATEGORY';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['forem_category.id', 'forem_category.name'];
    displayedColumns = ['forem_category.id', 'forem_category.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
