import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './wine.graphql';
import { Category, Product, Section } from '../../market/market.models';
import {MarketableService} from '../../../core/components/marketable/marketable.service';

@Component({
    selector: 'dh2-wine-detail',
    templateUrl: 'wine-detail.component.html',
    animations: fuseAnimations
})
export class WineDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'WINE.WINE';
    objectTranslationGender = 'M';

    // marketable variables
    products: Product[] = [];
    categories: Category[] = [];
    sections: Section[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            year: null,
            is_product: false
        });
    }

    argumentsRelationsObject(): Object
    {
        const sqlProduct = [
            {
                command: 'where',
                column: 'market_product_lang.lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_product.sort'
            }
        ];

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

        const sqlSection = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang_id'] ? this.params['lang_id'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'market_section.name'
            }
        ];

        return {
            sqlProduct,
            sqlCategory,
            sqlSection
        };
    }

    setRelationsData(data: any): void
    {
        // market products
        this.products = data.marketProducts;

        // market categories
        this.categories = data.marketCategories;

        // market categories
        this.sections = data.marketSections;
    }
}

