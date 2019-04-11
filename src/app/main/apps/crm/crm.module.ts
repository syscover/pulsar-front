import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from '@horus/modules/shared.module';
import { CrmRoutingModule } from './crm-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { AddressTypeListComponent } from './address-type/address-type-list.component';
import { AddressTypeDetailComponent } from './address-type/address-type-detail.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { CustomerGroupListComponent } from './customer-group/customer-group-list.component';
import { CustomerGroupDetailComponent } from './customer-group/customer-group-detail.component';

@NgModule({
    imports: [
        SharedModule,
        CrmRoutingModule,
        MatPasswordStrengthModule
    ],
    exports: [],
    declarations: [
        AddressTypeListComponent,
        AddressTypeDetailComponent,
        CustomerListComponent,
        CustomerDetailComponent,
        CustomerGroupListComponent,
        CustomerGroupDetailComponent,
    ],
    providers: []
})

export class CrmModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
