import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CustomerGroupGraphQLService } from './customer-group-graphql.service';

@Component({
    selector: 'dh2-crm-customer-group-detail',
    templateUrl: 'customer-group-detail.component.html',
    animations: fuseAnimations
})
export class CustomerGroupDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'APPS.CUSTOMER_GROUP';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGroupGraphQLService
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

