import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './customer-group.graphql';

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

