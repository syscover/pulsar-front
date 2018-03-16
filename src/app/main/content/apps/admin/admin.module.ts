import { NgModule } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from './../../../../../@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';


/* import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list.component';
import { UserDetailComponent } from './user/user-detail.component';
import { LangListComponent } from './lang/lang-list.component';
import { LangDetailComponent } from './lang/lang-detail.component';

import { CronJobListComponent } from './cron-job/cron-job-list.component';
import { CronJobDetailComponent } from './cron-job/cron-job-detail.component';
import { PackageListComponent } from './package/package-list.component';
import { PackageDetailComponent } from './package/package-detail.component';
import { FieldGroupListComponent } from './field-group/field-group-list.component';
import { FieldGroupDetailComponent } from './field-group/field-group-detail.component';
import { FieldListComponent } from './field/field-list.component';
import { FieldDetailComponent } from './field/field-detail.component';
import { FieldValueListComponent } from './field-value/field-value-list.component';
import { FieldValueDetailComponent } from './field-value/field-value-detail.component';
import { AttachmentMimeListComponent } from './attachment-mime/attachment-mime-list.component';
import { AttachmentMimeDetailComponent } from './attachment-mime/attachment-mime-detail.component';
import { AttachmentFamilyListComponent } from './attachment-family/attachment-family-list.component';
import { AttachmentFamilyDetailComponent } from './attachment-family/attachment-family-detail.component';
import { ProfileListComponent } from './profile/profile-list.component';
import { ProfileDetailComponent } from './profile/profile-detail.component';
import { ResourceListComponent } from './resource/resource-list.component';
import { ResourceDetailComponent } from './resource/resource-detail.component'; */

import { ActionListComponent } from './action/action-list.component';
import { ActionDetailComponent } from './action/action-detail.component';
import { CountryListComponent } from './country/country-list.component';
import { CountryDetailComponent } from './country/country-detail.component';

import { ActionGraphQLService } from './action/action-graphql.service';
import { CountryGraphQLService } from './country/country-graphql.service';
/* import { AttachmentFamilyGraphQLService } from './attachment-family/attachment-family-graphql.service';
import { AttachmentMimeGraphQLService } from './attachment-mime/attachment-mime-graphql.service';

import { CronJobGraphQLService } from './cron-job/cron-job-graphql.service';
import { FieldGroupGraphQLService } from './field-group/field-group-graphql.service';
import { FieldGraphQLService } from './field/field-graphql.service';
import { FieldValueGraphQLService } from './field-value/field-value-graphql.service';
import { LangGraphQLService } from './lang/lang-graphql.service';
import { PackageGraphQLService } from './package/package-graphql.service';
import { ProfileGraphQLService } from './profile/profile-graphql.service';
import { ResourceGraphQLService } from './resource/resource-graphql.service';
import { UserGraphQLService } from './user/user-graphql.service'; */

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    exports: [ ],
    declarations: [
        /* DashboardComponent,
        UserListComponent,
        UserDetailComponent,
        LangListComponent,
        LangDetailComponent,
        
        CronJobListComponent,
        CronJobDetailComponent,
        PackageListComponent,
        PackageDetailComponent,
        FieldGroupListComponent,
        FieldGroupDetailComponent,
        FieldListComponent,
        FieldDetailComponent,
        FieldValueListComponent,
        FieldValueDetailComponent,
        AttachmentMimeListComponent,
        AttachmentMimeDetailComponent,
        AttachmentFamilyListComponent,
        AttachmentFamilyDetailComponent,
        ProfileListComponent,
        ProfileDetailComponent,
        ResourceListComponent,
        ResourceDetailComponent, */
        ActionListComponent,
        ActionDetailComponent,
        CountryListComponent,
        CountryDetailComponent
    ],
    providers: [
        ActionGraphQLService,
        CountryGraphQLService,
        /* AttachmentFamilyGraphQLService,
        AttachmentMimeGraphQLService,
        CronJobGraphQLService,
        FieldGraphQLService,
        FieldGroupGraphQLService,
        FieldValueGraphQLService,
        LangGraphQLService,
        PackageGraphQLService,
        ProfileGraphQLService,
        ResourceGraphQLService,
        UserGraphQLService */
    ]
})

export class AdminModule 
{
    constructor(
        private translate: TranslateService,
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
