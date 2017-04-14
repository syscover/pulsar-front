import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

//import config = require('./shared/app-globals');

export const routes: Routes = [

    // bootstrap route
    { path: 'pulsar', redirectTo: 'pulsar/login', pathMatch: 'full' },
    { path: 'pulsar/login', component: LoginComponent },
    { path: 'pulsar/admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'pulsar/crm', loadChildren: 'app/crm/crm.module#CrmModule' },

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
