import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from './../../../../../@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { ActionListComponent } from './action/action-list.component';
import { ActionDetailComponent } from './action/action-detail.component';
import { CountryListComponent } from './country/country-list.component';
import { CountryDetailComponent } from './country/country-detail.component';
import { PackageListComponent } from './package/package-list.component';
import { PackageDetailComponent } from './package/package-detail.component';

import { ActionGraphQLService } from './action/action-graphql.service';
import { CountryGraphQLService } from './country/country-graphql.service';
import { PackageGraphQLService } from './package/package-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    exports: [ ],
    declarations: [
        ActionListComponent,
        ActionDetailComponent,
        CountryListComponent,
        CountryDetailComponent,
        PackageListComponent,
        PackageDetailComponent
    ],
    providers: [
        ActionGraphQLService,
        CountryGraphQLService,
        PackageGraphQLService,
    ]
})

export class AdminModule 
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
