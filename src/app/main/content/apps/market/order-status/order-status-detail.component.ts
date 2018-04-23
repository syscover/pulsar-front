import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { OrderStatusGraphQLService } from './order-status-graphql.service';

@Component({
    selector: 'dh2-order-status-detail',
    templateUrl: './order-status-detail.component.html',
    animations: fuseAnimations
})
export class OrderStatusDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.ORDER_STAUS';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: OrderStatusGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}, Validators.required],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            active: null
        });
    }
}
