import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './../shared/components/main-layout/main-layout.component';
import { DataContainerComponent } from './../shared/components/data-container/data-container.component';

//import { DashboardComponent } from './dashboard/dashboard.component';
//import { GroupListComponent } from './groups/group-list.component';
//import { GroupDetailComponent } from './groups/group-detail.component';

import * as config from './../core/app-globals';

const routes: Routes = [
    {
        path: '', component: MainLayoutComponent,
        //canActivate: [AuthGuard],
        children: [
            {
                path: '',                                       component: DataContainerComponent,
                children: [
                    { path: '',                                 redirectTo: '/' + config.appRootPrefix + '/admin/dashboard' },

                    // Categories
                    //{ path: 'categories',                        component: CountryListComponent },
                    //{ path: 'categories/create',                 component: CountryDetailComponent,      data: { action: 'create' }},
                    /*{ path: 'categories/create/:id/:lang/:newLang',
                        component: CountryDetailComponent,
                        data: { action: 'create-lang' }
                    },
                    { path: 'categories/show/:id/:lang',         component: CountryDetailComponent,      data: { action: 'edit' }},*/

                    // Wildcard route
                    { path: '**',                               redirectTo: 'dashboard' }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MarketRoutingModule {}
