import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from '@horus/modules/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';

import { ActionListComponent } from './action/action-list.component';
import { ActionDetailComponent } from './action/action-detail.component';
import { AttachmentFamilyListComponent } from './attachment-family/attachment-family-list.component';
import { AttachmentFamilyDetailComponent } from './attachment-family/attachment-family-detail.component';
import { AttachmentMimeListComponent } from './attachment-mime/attachment-mime-list.component';
import { AttachmentMimeDetailComponent } from './attachment-mime/attachment-mime-detail.component';
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
import { OauthAccessTokenListComponent } from './oauth-access-token/oauth-access-token-list.component';
import { OauthAccessTokenDetailComponent } from './oauth-access-token/oauth-access-token-detail.component';
import { OauthClientListComponent } from './oauth-client/oauth-client-list.component';
import { OauthClientDetailComponent } from './oauth-client/oauth-client-detail.component';
import { PackageListComponent } from './package/package-list.component';
import { PackageDetailComponent } from './package/package-detail.component';
import { PermissionListComponent } from './permission/premission-list.component';
import { ProfileListComponent } from './profile/profile-list.component';
import { ProfileDetailComponent } from './profile/profile-detail.component';
import { ReportDetailComponent } from './report/report-detail.component';
import { ReportListComponent } from './report/report-list.component';
import { ResourceListComponent } from './resource/resource-list.component';
import { ResourceDetailComponent } from './resource/resource-detail.component';
import { TerritorialArea1ListComponent } from './territorial_area_1/territorial-area-1-list.component';
import { TerritorialArea1DetailComponent } from './territorial_area_1/territorial-area-1-detail.component';
import { TerritorialArea2ListComponent } from './territorial_area_2/territorial-area-2-list.component';
import { TerritorialArea2DetailComponent } from './territorial_area_2/territorial-area-2-detail.component';
import { TerritorialArea3ListComponent } from './territorial_area_3/territorial-area-3-list.component';
import { TerritorialArea3DetailComponent } from './territorial_area_3/territorial-area-3-detail.component';
import { UserListComponent } from './user/user-list.component';
import { UserDetailComponent } from './user/user-detail.component';
import { WildcardDialogComponent } from './report/wildcard-dialog.component';

@NgModule({
    declarations: [
        ActionListComponent,
        ActionDetailComponent,
        AttachmentFamilyListComponent,
        AttachmentFamilyDetailComponent,
        AttachmentMimeListComponent,
        AttachmentMimeDetailComponent,
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
        OauthAccessTokenListComponent,
        OauthAccessTokenDetailComponent,
        OauthClientListComponent,
        OauthClientDetailComponent,
        PackageListComponent,
        PackageDetailComponent,
        PermissionListComponent,
        ProfileListComponent,
        ProfileDetailComponent,
        ReportDetailComponent,
        ReportListComponent,
        ResourceListComponent,
        ResourceDetailComponent,
        TerritorialArea1ListComponent,
        TerritorialArea1DetailComponent,
        TerritorialArea2ListComponent,
        TerritorialArea2DetailComponent,
        TerritorialArea3ListComponent,
        TerritorialArea3DetailComponent,
        UserListComponent,
        UserDetailComponent,
        WildcardDialogComponent
    ],
    imports: [
        SharedModule,
        AdminRoutingModule,
        MatPasswordStrengthModule
    ],
    exports: [],
    entryComponents: [
        WildcardDialogComponent
    ]
})

export class AdminModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
