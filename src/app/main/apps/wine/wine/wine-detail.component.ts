import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { WineGraphqlService } from './wine-graphql.service';
import {Category} from '../../market/market.models';

@Component({
    selector: 'dh2-wine-detail',
    templateUrl: 'wine-detail.component.html',
    animations: fuseAnimations
})
export class WineDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'WINE.WINE';
    objectTranslationGender = 'M';
    categories: Category[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: WineGraphqlService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            year: null,
            is_product: false,
            product: this.fb.group({
                sku: null,
                categories_id: [[], Validators.required],
                price: null
            })
        });
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

