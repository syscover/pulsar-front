import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { graphQL } from './customer-class-tax.graphql';

@Component({
    selector: 'dh2-market-customer-class-tax-detail',
    templateUrl: 'customer-class-tax-detail.component.html',
    animations: fuseAnimations
})
export class CustomerClassTaxDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.CUSTOMER_CLASS_TAX';
    objectTranslationGender = 'M';
    baseUri = '/apps/market/taxes/customer-class-tax';

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

