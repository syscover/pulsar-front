import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './../shared/components/main-layout/main-layout.component';

//import { AuthGuard }                    from '../shared/auth/auth-guard.service';

import { DashboardComponent } from './dashboard/dashboard.component';
import { LangListComponent } from './langs/lang-list.component';
import { LangDetailComponent } from './langs/lang-detail.component';
import { CountryListComponent } from './countries/country-list.component';
import { CountryDetailComponent } from './countries/country-detail.component';
import { ProfileListComponent } from './profiles/profile-list.component';
import { ProfileDetailComponent } from './profiles/profile-detail.component';
import { ActionListComponent } from './actions/action-list.component';
import { ActionDetailComponent } from './actions/action-detail.component';

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent,
        //canActivate: [AuthGuard],
        children: [
            { path: '',                         redirectTo: 'dashboard' },

            // Dashboard
            { path: 'dashboard',                        component: DashboardComponent },

            // Actions
            { path: 'actions',                          component: ActionListComponent },
            { path: 'actions/create',                   component: ActionDetailComponent },
            { path: 'actions/show/:id',                 component: ActionDetailComponent },

            // Langs
            { path: 'langs',                            component: LangListComponent },
            { path: 'langs/create',                     component: LangDetailComponent },
            { path: 'langs/show/:id',                   component: LangDetailComponent },

            // Profiles
            { path: 'profiles',                         component: ProfileListComponent },
            { path: 'profiles/create',                  component: ProfileDetailComponent },
            { path: 'profiles/show/:id',                component: ProfileDetailComponent },

            // Countries
            { path: 'countries',                        component: CountryListComponent },
            { path: 'countries/create',                 component: CountryDetailComponent },
            { path: 'countries/show/:id/:lang',         component: CountryDetailComponent },

            // Wildcard route
            { path: '**',                               redirectTo: 'dashboard' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {}
