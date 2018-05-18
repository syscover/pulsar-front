import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from './../../../../../@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { CrmRoutingModule } from './crm-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { AddressTypeListComponent } from './address-type/address-type-list.component';
import { AddressTypeDetailComponent } from './address-type/address-type-detail.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { GroupListComponent } from './group/group-list.component';
import { GroupDetailComponent } from './group/group-detail.component';

import { AddressTypeGraphQLService } from './address-type/address-type-graphql.service';
import { CustomerGraphQLService } from './customer/customer-graphql.service';
import { GroupGraphQLService } from './group/group-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        CrmRoutingModule
    ],
    exports: [ ],
    declarations: [
        AddressTypeListComponent,
        AddressTypeDetailComponent,
        CustomerListComponent,
        CustomerDetailComponent,
        GroupListComponent,
        GroupDetailComponent,
    ],
    providers: [
        AddressTypeGraphQLService,
        CustomerGraphQLService,
        GroupGraphQLService,
    ]
})

export class CrmModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
