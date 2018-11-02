import {Component, Injector, Input} from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './wine.graphql';
import { Category, PriceType, Product, ProductClassTax, ProductType, Section } from '../../market/market.models';
import { MarketableService } from '../../../core/components/marketable/marketable.service';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-wine-detail',
    templateUrl: 'wine-detail.component.html',
    animations: fuseAnimations
})
export class WineDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'WINE.WINE';
    objectTranslationGender = 'M';

    // ***** start - marketable variables
    products: Product[] = [];
    categories: Category[] = [];
    sections: Section[] = [];
    productTypes: ProductType[] = [];
    priceTypes: PriceType[] = [];
    productClassTaxes: ProductClassTax[] = [];
    // ***** end - marketable variables

    constructor(
        protected injector: Injector,
        private _marketable: MarketableService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            slug: [null, Validators.required],
            year: null,
            is_product: false
        });
    }

    argumentsRelationsObject(): Object
    {
        const marketableArguments = this._marketable.getArgumentsRelations(this.baseLang, this.params['lang_id'], this.params['id'], true);

        return {
            ...marketableArguments
        };
    }

    setRelationsData(data: any): void
    {
        // ***** start - marketable relations
        // market products
        this.products = data.marketProducts;

        // market categories
        this.categories = data.marketCategories;

        // market sections
        this.sections = data.marketSections;

        // market product types
        this.productTypes = data.marketProductTypes;

        // market price types
        this.priceTypes = data.marketPriceTypes;

        // market product class taxes
        this.productClassTaxes = data.marketProductClassTaxes;
        // ***** end - marketable relations
    }

    afterPatchValueEdit(): void
    {
        // set market categories extracting ids
        this.fg.controls['categories_id'].setValue(_.map(this.object.categories, 'id'));

        // set market sections extracting ids
        this.fg.controls['sections_id'].setValue(_.map(this.object.sections, 'id'));

        this._marketable.handleGetProductTaxes(
            this.fg,
            this.fg.get('subtotal').value,
            true
        );
    }
}

