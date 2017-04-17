import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import * as config from './core/app-globals';

export const routes: Routes = [

    // bootstrap route
    { path: config.appRootPrefix, redirectTo: config.appRootPrefix + '/login', pathMatch: 'full' },
    { path: config.appRootPrefix + '/login', component: LoginComponent },
    { path: config.appRootPrefix + '/admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: config.appRootPrefix + '/crm', loadChildren: 'app/crm/crm.module#CrmModule' },
    { path: config.appRootPrefix + '/market', loadChildren: 'app/market/market.module#MarketModule' },

    //{ path: config.appUrlPrefix + 'cms', loadChildren: 'app/cms/cms.module#CmsModule' },
    
    //{ path: config.appUrlPrefix + 'material', loadChildren: 'app/dev-material/dev-material.module#DevMaterialModule' },
    //{ path: config.appUrlPrefix + 'polymer', loadChildren: 'app/dev-polymer/dev-polymer.module#DevPolymerModule' },
    //{ path: config.appUrlPrefix + 'vaadin', loadChildren: 'app/dev-vaadin/dev-vaadin.module#DevVaadinModule' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
