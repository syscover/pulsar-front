import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { graphQL } from './category.graphql';
import { Category } from '../market.models';

@Component({
    selector: 'dh2-market-category-detail',
    templateUrl: './category-detail.component.html',
    animations: fuseAnimations
})
export class CategoryDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'APPS.CATEGORY';
    objectTranslationGender = 'F';
    graphQL = graphQL;
    categories: Category[] = [];
    loadingSlug = false;

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: [{value: '', disabled: true}, Validators.required],
            lang_id: ['', Validators.required],
            parent_id: '',
            name: ['', Validators.required],
            slug: ['', Validators.required],
            active: false,
            description: ''
        });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    argumentsRelationsObject(): object
    {
        const sqlCategory = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang.id
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_category.name'
            }
        ];

        return {
            sqlCategory
        };
    }

    setRelationsData(data: any): void
    {
        // market category
        this.categories = data.marketCategories;
    }
}
