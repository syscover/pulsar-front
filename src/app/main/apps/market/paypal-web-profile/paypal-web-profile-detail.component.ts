import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { PaypalWebProfileGraphqlService } from './paypal-web-profile-graphql.service';

@Component({
    selector: 'dh2-market-paypal-web-profile-detail',
    templateUrl: 'paypal-web-profile-detail.component.html',
    animations: fuseAnimations
})
export class PaypalWebProfileDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'PAYPAL.WEB_PROFILE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        public graphQL: PaypalWebProfileGraphqlService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required],
            temporary: false,
            flow_config: this.fb.group({
                landing_page_type: ['', Validators.required],
                bank_txn_pending_url: ['', Validators.required],
                user_action: ['', Validators.required],
                return_uri_http_method: ['', Validators.required]
            }),
            input_fields: this.fb.group({
                allow_note: [false, Validators.required],
                no_shipping: ['', Validators.required],
                address_override: ['', Validators.required]
            }),
            presentation: this.fb.group({
                brand_name: ['', Validators.required],
                logo_image: ['', Validators.required],
                locale_code: ['', Validators.required],
                return_url_label: ['', Validators.required],
                note_to_seller_label: ['', Validators.required]
            })
        });
    }
}

