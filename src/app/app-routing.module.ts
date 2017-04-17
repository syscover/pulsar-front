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
    { path: config.appRootPrefix + '/market', loadChildren: 'app/market/market.module#MarketModule' }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
