import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './paypal-web-profile.graphql';

@Component({
    selector: 'dh2-market-paypal-web-profile-list',
    templateUrl: './paypal-web-profile-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class PaypalWebProfileListComponent extends CoreListComponent
{
    objectTranslation = 'PAYPAL.WEB_PROFILE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['market_paypal_web_profile.id', 'market_paypal_web_profile.name'];
    displayedColumns = ['market_paypal_web_profile.id', 'market_paypal_web_profile.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
