import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { OrderGraphQLService } from './order-graphql.service';

@Component({
    selector: 'dh2-order-detail',
    templateUrl: 'order-detail.component.html',
    animations: fuseAnimations
})
export class OrderDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'MARKET.ORDER';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: OrderGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [null, Validators.required],
            group_id: [null, Validators.required],
            company: null,
            tin: null,
            name: null,
            surname: null,
            address: null,
            email: [null, Validators.required],
            user: [null, Validators.required],
            password: null,
            // re_password: null,
            active: false
        });
    }
}

