import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './category.graphql';
import { Category } from '../market.models';

@Component({
    selector: 'dh2-market-category-detail',
    templateUrl: './category-detail.component.html',
    animations: fuseAnimations
})
export class CategoryDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.CATEGORY';
    objectTranslationGender = 'F';
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
            ix: null,
            id: [{value: null, disabled: true}, Validators.required],
            lang_id: [null, Validators.required],
            parent_id: null,
            name: [null, Validators.required],
            slug: [null, Validators.required],
            active: false,
            description: null
        });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    argumentsRelationsObject(): Object
    {
        const sqlCategory = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
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
