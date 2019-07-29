import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { graphQL } from './order-status.graphql';

@Component({
    selector: 'dh2-market-order-status-detail',
    templateUrl: './order-status-detail.component.html',
    animations: fuseAnimations
})
export class OrderStatusDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.ORDER_STATUS';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: [{value: '', disabled: true}, Validators.required],
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            active: ''
        });
    }
}
