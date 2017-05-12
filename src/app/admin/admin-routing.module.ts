import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './../shared/components/main-layout/main-layout.component';
import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';

//import { AuthGuard }                    from '../shared/auth/auth-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LangListComponent } from './lang/lang-list.component';
import { LangDetailComponent } from './lang/lang-detail.component';
import { CountryListComponent } from './country/country-list.component';
import { CountryDetailComponent } from './country/country-detail.component';
import { PackageListComponent } from './package/package-list.component';
import { PackageDetailComponent } from './package/package-detail.component';
import { FieldGroupListComponent } from './field-group/field-group-list.component';
import { FieldGroupDetailComponent } from './field-group/field-group-detail.component';
import { FieldListComponent } from './field/field-list.component';
import { FieldDetailComponent } from './field/field-detail.component';
import { FieldValueListComponent } from './field-value/field-value-list.component';
import { ProfileListComponent } from './profile/profile-list.component';
import { ProfileDetailComponent } from './profile/profile-detail.component';
import { ResourceListComponent } from './resource/resource-list.component';
import { ResourceDetailComponent } from './resource/resource-detail.component';
import { ActionListComponent } from './action/action-list.component';
import { ActionDetailComponent } from './action/action-detail.component';

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent,
        //canActivate: [AuthGuard],
        children: [
            {
                path: '',                                               component: DataContainerComponent,
                children: [
                     // Dashboard
                    { path: 'dashboard',                                component: DashboardComponent },

                    // Langs
                    { path: 'lang',                                     component: LangListComponent },
                    { path: 'lang/create',                              component: LangDetailComponent,         data: { action: 'create' }},
                    { path: 'lang/show/:id',                            component: LangDetailComponent,         data: { action: 'edit' }},

                    // Countries
                    { path: 'country',                                  component: CountryListComponent },
                    { path: 'country/create',                           component: CountryDetailComponent,      data: { action: 'create' }},
                    { path: 'country/create/:id/:lang/:newLang',        component: CountryDetailComponent,      data: { action: 'create-lang' }},
                    { path: 'country/show/:id/:lang',                   component: CountryDetailComponent,      data: { action: 'edit' }},

                    // Packages
                    { path: 'package',                                  component: PackageListComponent },
                    { path: 'package/create',                           component: PackageDetailComponent,      data: { action: 'create' }},
                    { path: 'package/show/:id',                         component: PackageDetailComponent,      data: { action: 'edit' }},

                    // Field groups
                    { path: 'field-group',                              component: FieldGroupListComponent },
                    { path: 'field-group/create',                       component: FieldGroupDetailComponent,   data: { action: 'create' }},
                    { path: 'field-group/show/:id',                     component: FieldGroupDetailComponent,   data: { action: 'edit' }},

                    // Fields
                    { path: 'field',                                    component: FieldListComponent },
                    { path: 'field/create',                             component: FieldDetailComponent,        data: { action: 'create' }},
                    { path: 'field/create/:id/:lang/:newLang',          component: FieldDetailComponent,        data: { action: 'create-lang' }},
                    { path: 'field/show/:id/:lang',                     component: FieldDetailComponent,        data: { action: 'edit' }},

                    // Field Values
                    { path: 'field-value/:field',                       component: FieldValueListComponent },
                    { path: 'field-value/create',                       component: FieldDetailComponent,        data: { action: 'create' }},
                    { path: 'field-value/create/:id/:lang/:newLang',    component: FieldDetailComponent,        data: { action: 'create-lang' }},
                    { path: 'field-value/show/:id/:lang',               component: FieldDetailComponent,        data: { action: 'edit' }},

                    // Actions
                    { path: 'action',                                   component: ActionListComponent },
                    { path: 'action/create',                            component: ActionDetailComponent,       data: { action: 'create' }},
                    { path: 'action/show/:id',                          component: ActionDetailComponent,       data: { action: 'edit' }},

                    // Resources
                    { path: 'resource',                                 component: ResourceListComponent },
                    { path: 'resource/create',                          component: ResourceDetailComponent,     data: { action: 'create' }},
                    { path: 'resource/show/:id',                        component: ResourceDetailComponent,     data: { action: 'edit' }},

                    // Profiles
                    { path: 'profile',                                  component: ProfileListComponent },
                    { path: 'profile/create',                           component: ProfileDetailComponent,      data: { action: 'create' }},
                    { path: 'profile/show/:id',                         component: ProfileDetailComponent,      data: { action: 'edit' }},

                    // Wildcard route
                    { path: '',                                         redirectTo: 'dashboard' },
                    { path: '**',                                       component: ErrorComponent,             data: { error: '404' }}
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
