import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { AdminRoutingModule } from './admin-routing.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LangListComponent } from './lang/lang-list.component';
import { LangDetailComponent } from './lang/lang-detail.component';
import { CountryListComponent } from './country/country-list.component';
import { CountryDetailComponent } from './country/country-detail.component';
import { ProfileListComponent } from './profile/profile-list.component';
import { ProfileDetailComponent } from './profile/profile-detail.component';
import { ActionListComponent } from './action/action-list.component';
import { ActionDetailComponent } from './action/action-detail.component';

import { LangService } from './lang/lang.service';
import { CountryService } from './country/country.service';
import { ProfileService } from './profile/profile.service';
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