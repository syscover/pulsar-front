import { AttachmentFamilyGraphQLService } from './attachment-family/attachment-family-graphql.service';
import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from './../../../../../@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { ActionListComponent } from './action/action-list.component';
import { ActionDetailComponent } from './action/action-detail.component';
import { AttachmentFamilyListComponent } from './attachment-family/attachment-family-list.component';
import { AttachmentFamilyDetailComponent } from './attachment-family/attachment-family-detail.component';
import { CountryListComponent } from './country/country-list.component';
import { CountryDetailComponent } from './country/country-detail.component';
import { FieldGroupListComponent } from './field-group/field-group-list.component';
import { FieldGroupDetailComponent } from './field-group/field-group-detail.component';
import { FieldListComponent } from './field/field-list.component';
import { FieldDetailComponent } from './field/field-detail.component';
import { FieldValueListComponent } from './field-value/field-value-list.component';
import { FieldValueDetailComponent } from './field-value/field-value-detail.component';
import { LangListComponent } from './lang/lang-list.component';
import { LangDetailComponent } from './lang/lang-detail.component';
import { PackageListComponent } from './package/package-list.component';
import { PackageDetailComponent } from './package/package-detail.component';
import { ProfileListComponent } from './profile/profile-list.component';
import { ProfileDetailComponent } from './profile/profile-detail.component';
import { ResourceListComponent } from './resource/resource-list.component';
import { ResourceDetailComponent } from './resource/resource-detail.component';
import { TerritorialArea1ListComponent } from './territorial_area_1/territorial-area-1-list.component';

import { ActionGraphQLService } from './action/action-graphql.service';
import { CountryGraphQLService } from './country/country-graphql.service';
import { CronJobGraphQLService } from './cron-job/cron-job-graphql.service';
import { FieldGroupGraphQLService } from './field-group/field-group-graphql.service';
import { FieldGraphQLService } from './field/field-graphql.service';
import { FieldValueGraphQLService } from './field-value/field-value-graphql.service';
import { LangGraphQLService } from './lang/lang-graphql.service';
import { PackageGraphQLService } from './package/package-graphql.service';
import { ProfileGraphQLService } from './profile/profile-graphql.service';
import { ResourceGraphQLService } from './resource/resource-graphql.service';
import { TerritorialArea1GraphQLService } from './territorial_area_1/territorial-area-1-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    exports: [ ],
    declarations: [
        ActionListComponent,
        ActionDetailComponent,
        AttachmentFamilyListComponent,
        AttachmentFamilyDetailComponent,
        CountryListComponent,
        CountryDetailComponent,
        FieldGroupListComponent,
        FieldGroupDetailComponent,
        FieldListComponent,
        FieldDetailComponent,
        FieldValueListComponent,
        FieldValueDetailComponent,
        LangListComponent,
        LangDetailComponent,
        PackageListComponent,
        PackageDetailComponent,
        ProfileListComponent,
        ProfileDetailComponent,
        ResourceListComponent,
        ResourceDetailComponent,
        TerritorialArea1ListComponent
    ],
    providers: [
        ActionGraphQLService,
        AttachmentFamilyGraphQLService,
        CountryGraphQLService,
        CronJobGraphQLService,
        FieldGroupGraphQLService,
        FieldGraphQLService,
        FieldValueGraphQLService,
        LangGraphQLService,
        PackageGraphQLService,
        ProfileGraphQLService,
        ResourceGraphQLService,
        TerritorialArea1GraphQLService
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
