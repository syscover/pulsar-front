import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CustomerClassTaxGraphQLService } from './customer-class-tax-graphql.service';

@Component({
    selector: 'dh2-customer-class-tax-detail',
    templateUrl: 'customer-class-tax-detail.component.html',
    animations: fuseAnimations
})
export class CustomerClassTaxDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.CUSTOMER_CLASS_TAX';
    objectTranslationGender = 'M';
    baseUri = '/apps/market/taxes/customer-class-tax';

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerClassTaxGraphQLService
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

