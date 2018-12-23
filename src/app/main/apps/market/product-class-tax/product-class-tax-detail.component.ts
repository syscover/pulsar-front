import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './product-class-tax.graphql';

@Component({
    selector: 'dh2-market-product-class-tax-detail',
    templateUrl: 'product-class-tax-detail.component.html',
    animations: fuseAnimations
})
export class ProductClassTaxDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.PRODUCT_CLASS_TAX';
    objectTranslationGender = 'M';
    baseUri = '/apps/market/taxes/product-class-tax';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required]
        });
    }
}

