import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { PaypalWebProfileGraphqlService } from './paypal-web-profile-graphql.service';

@Component({
    selector: 'dh2-paypal-web-profile-list',
    templateUrl: './paypal-web-profile-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class PaypalWebProfileListComponent extends CoreListComponent
{
    objectTranslation = 'MARKET.WEB_PROFILE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['market_paypal_web_profile.id', 'market_paypal_web_profile.name'];
    displayedColumns = ['market_paypal_web_profile.id', 'market_paypal_web_profile.name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: PaypalWebProfileGraphqlService
    ) {
        super(injector, graphQL);
    }
}
