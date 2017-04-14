import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LangListComponent } from './langs/lang-list.component';
import { LangDetailComponent } from './langs/lang-detail.component';
import { CountryListComponent } from './countries/country-list.component';
import { CountryDetailComponent } from './countries/country-detail.component';
import { ProfileListComponent } from './profiles/profile-list.component';
import { ProfileDetailComponent } from './profiles/profile-detail.component';
import { ActionListComponent } from './actions/action-list.component';
import { ActionDetailComponent } from './actions/action-detail.component';

import { LangService } from './langs/lang.service';
import { CountryService } from './countries/country.service';
import { ProfileService } from './profiles/profile.service';
import { ActionService } from './actions/action.service';

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
        ProfileListComponent,
        ProfileDetailComponent,
        ActionListComponent,
        ActionDetailComponent
    ],
    providers: [
        LangService,
        CountryService,
        ProfileService,
        ActionService
    ],
    bootstrap: []
})

export class AdminModule {
    constructor() {}
}