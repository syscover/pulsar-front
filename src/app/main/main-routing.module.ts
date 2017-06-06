import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as config from './../core/app-globals';

const routes: Routes = [
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'crm', loadChildren: 'app/crm/crm.module#CrmModule' },
    { path: 'market', loadChildren: 'app/market/market.module#MarketModule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {}
