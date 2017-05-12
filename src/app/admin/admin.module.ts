import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

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

import { LangService } from './lang/lang.service';
import { CountryService } from './country/country.service';
import { PackageService } from './package/package.service';
import { FieldGroupService } from './field-group/field-group.service';
import { FieldService } from './field/field.service';
import { FieldValueService } from './field-value/field-value.service';
import { ProfileService } from './profile/profile.service';
import { ResourceService } from './resource/resource.service';
import { ActionService } from './action/action.service';

@NgModule({
    imports: [
        SharedModule,
        AdminRoutingModule
    ],
    declarations: [
        DashboardComponent,
        LangListComponent,
        LangDetailComponent,
        CountryListComponent,
        CountryDetailComponent,
        PackageListComponent,
        PackageDetailComponent,
        FieldGroupListComponent,
        FieldGroupDetailComponent,
        FieldListComponent,
        FieldDetailComponent,
        FieldValueListComponent,
        ProfileListComponent,
        ProfileDetailComponent,
        ResourceListComponent,
        ResourceDetailComponent,
        ActionListComponent,
        ActionDetailComponent
    ],
    providers: [
        LangService,
        CountryService,
        PackageService,
        FieldGroupService,
        FieldService,
        FieldValueService,
        ProfileService,
        ResourceService,
        ActionService
    ],
    bootstrap: []
})

export class AdminModule {
    constructor() {}
}
