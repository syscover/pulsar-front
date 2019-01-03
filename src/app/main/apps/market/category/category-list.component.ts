import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './category.graphql';
import { Category } from '../market.models';

@Component({
    selector: 'dh2-market-category-list',
    templateUrl: './category-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class CategoryListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.CATEGORY';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['market_category.id', 'market_category.name'];
    displayedColumns = ['market_category.id', 'market_category.name', 'market_category.parent_id', 'market_category.active', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];
    categories: Category[] = [];

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    getCustomArgumentsGetRecords(args: Object): Object
    {
        args['sqlCategory'] = [{
            command: 'where',
            column: 'lang_id',
            operator: '=',
            value: this.baseLang
        }];

        return args;
    }

    setRelationsData(data: any): void
    {
        this.categories = data.marketCategories;
    }
}
