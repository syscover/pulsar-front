import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ProductClassTaxGraphQLService } from './product-class-tax-graphql.service';

@Component({
    selector: 'dh2-product-class-tax-detail',
    templateUrl: 'product-class-tax-detail.component.html',
    animations: fuseAnimations
})
export class ProductClassTaxDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.PRODUCT_CLASS_TAX';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: ProductClassTaxGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required]
        });
    }
}

