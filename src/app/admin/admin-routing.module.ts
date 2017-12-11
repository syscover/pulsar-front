import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';

import { AuthGuard } from './../core/auth/auth-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserListComponent } from './user/user-list.component';
import { UserDetailComponent } from './user/user-detail.component';
import { LangListComponent } from './lang/lang-list.component';
import { LangDetailComponent } from './lang/lang-detail.component';
import { CountryListComponent } from './country/country-list.component';
import { CountryDetailComponent } from './country/country-detail.component';
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
import { ResourceDetailComponent } from './resource/resource-detail.component';
import { ActionListComponent } from './action/action-list.component';
import { ActionDetailComponent } from './action/action-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',                                                       component: DataContainerComponent,
                canActivateChild: [AuthGuard],
                children: [
                     // Dashboard
                    { path: 'dashboard',                                        component: DashboardComponent },

                    // Langs
                    { path: 'user',                                             component: UserListComponent },
                    { path: 'user/create',                                      component: UserDetailComponent,                 data: { action: 'create' }},
                    { path: 'user/show/:id',                                    component: UserDetailComponent,                 data: { action: 'edit' }},

                    // Langs
                    { path: 'lang',                                             component: LangListComponent },
                    { path: 'lang/create',                                      component: LangDetailComponent,                 data: { action: 'create' }},
                    { path: 'lang/show/:id',                                    component: LangDetailComponent,                 data: { action: 'edit' }},

                    // Countries
                    { path: 'country',                                          component: CountryListComponent },
                    { path: 'country/create',                                   component: CountryDetailComponent,              data: { action: 'create' }},
                    { path: 'country/create/:lang_id/:id',                      component: CountryDetailComponent,              data: { action: 'create-lang' }},
                    { path: 'country/show/:lang_id/:id',                        component: CountryDetailComponent,              data: { action: 'edit' }},

                    // Packages
                    { path: 'package',                                          component: PackageListComponent },
                    { path: 'package/create',                                   component: PackageDetailComponent,              data: { action: 'create' }},
                    { path: 'package/show/:id',                                 component: PackageDetailComponent,              data: { action: 'edit' }},

                    // Cron jobs
                    { path: 'cron-job',                                         component: CronJobListComponent },
                    { path: 'cron-job/create',                                  component: CronJobDetailComponent,              data: { action: 'create' }},
                    { path: 'cron-job/show/:id',                                component: CronJobDetailComponent,              data: { action: 'edit' }},

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

                    // Attachment families
                    { path: 'attachment-family',                                component: AttachmentFamilyListComponent },
                    { path: 'attachment-family/create',                         component: AttachmentFamilyDetailComponent,     data: { action: 'create' }},
                    { path: 'attachment-family/show/:id',                       component: AttachmentFamilyDetailComponent,     data: { action: 'edit' }},

                    // Attachment mimes
                    { path: 'attachment-mime',                                  component: AttachmentMimeListComponent },
                    { path: 'attachment-mime/create',                           component: AttachmentMimeDetailComponent,       data: { action: 'create' }},
                    { path: 'attachment-mime/show/:id',                         component: AttachmentMimeDetailComponent,       data: { action: 'edit' }},

                    // Actions
                    { path: 'action',                                           component: ActionListComponent },
                    { path: 'action/create',                                    component: ActionDetailComponent,               data: { action: 'create' }},
                    { path: 'action/show/:id',                                  component: ActionDetailComponent,               data: { action: 'edit' }},

                    // Resources
                    { path: 'resource',                                         component: ResourceListComponent },
                    { path: 'resource/create',                                  component: ResourceDetailComponent,             data: { action: 'create' }},
                    { path: 'resource/show/:id',                                component: ResourceDetailComponent,             data: { action: 'edit' }},

                    // Profiles
                    { path: 'profile',                                          component: ProfileListComponent },
                    { path: 'profile/create',                                   component: ProfileDetailComponent,              data: { action: 'create' }},
                    { path: 'profile/show/:id',                                 component: ProfileDetailComponent,              data: { action: 'edit' }},

                    // Wildcard route
                    { path: '',                                                 redirectTo: 'dashboard' },
                    { path: '**',                                               component: ErrorComponent,                      data: { error: '404' }}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {}
