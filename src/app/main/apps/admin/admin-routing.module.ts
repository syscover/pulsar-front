import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

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
import { TerritorialArea1DetailComponent } from './territorial_area_1/territorial-area-1-detail.component';
import { TerritorialArea2ListComponent } from './territorial_area_2/territorial-area-2-list.component';
import { TerritorialArea2DetailComponent } from './territorial_area_2/territorial-area-2-detail.component';
import { TerritorialArea3ListComponent } from './territorial_area_3/territorial-area-3-list.component';
import { TerritorialArea3DetailComponent } from './territorial_area_3/territorial-area-3-detail.component';
import { UserListComponent } from './user/user-list.component';
import { UserDetailComponent } from './user/user-detail.component';

/*
        // Attachment mimes
        { path: 'attachment-mime',                                  component: AttachmentMimeListComponent },
        { path: 'attachment-mime/create',                           component: AttachmentMimeDetailComponent,       data: { action: 'create' }},
        { path: 'attachment-mime/show/:id',                         component: AttachmentMimeDetailComponent,       data: { action: 'edit' }},            
*/

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Users
            { path: 'user',                                             component: UserListComponent },
            { path: 'user/create',                                      component: UserDetailComponent,                 data: { action: 'create' }},
            { path: 'user/show/:id',                                    component: UserDetailComponent,                 data: { action: 'edit' }},

            // Actions
            { path: 'action',                                           component: ActionListComponent },
            { path: 'action/create',                                    component: ActionDetailComponent,               data: { action: 'create' }},
            { path: 'action/show/:id',                                  component: ActionDetailComponent,               data: { action: 'edit' }},

            // Attachment families
            { path: 'attachment-family',                                component: AttachmentFamilyListComponent },
            { path: 'attachment-family/create',                         component: AttachmentFamilyDetailComponent,     data: { action: 'create' }},
            { path: 'attachment-family/show/:id',                       component: AttachmentFamilyDetailComponent,     data: { action: 'edit' }},

            // Countries
            { path: 'country',                                          component: CountryListComponent },
            { path: 'country/create',                                   component: CountryDetailComponent,              data: { action: 'create' }},
            { path: 'country/create/:lang_id/:id',                      component: CountryDetailComponent,              data: { action: 'create-lang' }},
            { path: 'country/show/:lang_id/:id',                        component: CountryDetailComponent,              data: { action: 'edit' }},

            // Territorial areas 1
            { path: 'country/territorial-area-1/:country_id',           component: TerritorialArea1ListComponent },
            { path: 'country/territorial-area-1/create/:country_id',    component: TerritorialArea1DetailComponent,     data: { action: 'create' }},
            { path: 'country/territorial-area-1/show/:country_id/:id',  component: TerritorialArea1DetailComponent,     data: { action: 'edit' }},

            // Territorial areas 2
            { path: 'country/territorial-area-2/:country_id',           component: TerritorialArea2ListComponent },
            { path: 'country/territorial-area-2/create/:country_id',    component: TerritorialArea2DetailComponent,     data: { action: 'create' }},
            { path: 'country/territorial-area-2/show/:country_id/:id',  component: TerritorialArea2DetailComponent,     data: { action: 'edit' }},

            // Territorial areas 3
            { path: 'country/territorial-area-3/:country_id',           component: TerritorialArea3ListComponent },
            { path: 'country/territorial-area-3/create/:country_id',    component: TerritorialArea3DetailComponent,     data: { action: 'create' }},
            { path: 'country/territorial-area-3/show/:country_id/:id',  component: TerritorialArea3DetailComponent,     data: { action: 'edit' }},

            // Field groups
            { path: 'field-group',                                      component: FieldGroupListComponent },
            { path: 'field-group/create',                               component: FieldGroupDetailComponent,           data: { action: 'create' }},
            { path: 'field-group/show/:id',                             component: FieldGroupDetailComponent,           data: { action: 'edit' }},

            // Fields
            { path: 'field',                                            component: FieldListComponent },
            { path: 'field/create',                                     component: FieldDetailComponent,                data: { action: 'create' }},
            { path: 'field/create/:lang_id/:id',                        component: FieldDetailComponent,                data: { action: 'create-lang' }},
            { path: 'field/show/:lang_id/:id',                          component: FieldDetailComponent,                data: { action: 'edit' }},

            // Field Values
            { path: 'field-value/:field_id',                            component: FieldValueListComponent },
            { path: 'field-value/create/:field_id',                     component: FieldValueDetailComponent,           data: { action: 'create' }},
            { path: 'field-value/create/:field_id/:lang_id/:id',        component: FieldValueDetailComponent,           data: { action: 'create-lang' }},
            { path: 'field-value/show/:field_id/:lang_id/:id',          component: FieldValueDetailComponent,           data: { action: 'edit' }},

            // Langs
            { path: 'lang',                                             component: LangListComponent },
            { path: 'lang/create',                                      component: LangDetailComponent,                 data: { action: 'create' }},
            { path: 'lang/show/:id',                                    component: LangDetailComponent,                 data: { action: 'edit' }},

            // Packages
            { path: 'package',                                          component: PackageListComponent },
            { path: 'package/create',                                   component: PackageDetailComponent,              data: { action: 'create' }},
            { path: 'package/show/:id',                                 component: PackageDetailComponent,              data: { action: 'edit' }},

            // Profiles
            { path: 'profile',                                          component: ProfileListComponent },
            { path: 'profile/create',                                   component: ProfileDetailComponent,              data: { action: 'create' }},
            { path: 'profile/show/:id',                                 component: ProfileDetailComponent,              data: { action: 'edit' }},

            // Resources
            { path: 'resource',                                         component: ResourceListComponent },
            { path: 'resource/create',                                  component: ResourceDetailComponent,             data: { action: 'create' }},
            { path: 'resource/show/:id',                                component: ResourceDetailComponent,             data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {}
