import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { PaypalWebProfileGraphqlService } from './paypal-web-profile-graphql.service';

@Component({
    selector: 'dh2-paypal-web-profile-detail',
    templateUrl: 'paypal-web-profile-detail.component.html',
    animations: fuseAnimations
})
export class PaypalWebProfileDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'PAYPAL.WEB_PROFILE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: PaypalWebProfileGraphqlService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            temporary: false,
            flow_config: this.fb.group({
                landing_page_type: [null, Validators.required],
                bank_txn_pending_url: [null, Validators.required],
                user_action: [null, Validators.required],
                return_uri_http_method: [null, Validators.required]
            }),
            input_fields: this.fb.group({
                allow_note: [false, Validators.required],
                no_shipping: [null, Validators.required],
                address_override: [null, Validators.required]
            }),
            presentation: this.fb.group({
                brand_name: [null, Validators.required],
                logo_image: [null, Validators.required],
                locale_code: [null, Validators.required],
                return_url_label: [null, Validators.required],
                note_to_seller_label: [null, Validators.required]
            })
        });
    }
}

