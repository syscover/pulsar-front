import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'admin', loadChildren: 'app/admin/admin.module#AdminModule' },
    { path: 'cms', loadChildren: 'app/cms/cms.module#CmsModule' },
    { path: 'crm', loadChildren: 'app/crm/crm.module#CrmModule' },
    { path: 'market', loadChildren: 'app/market/market.module#MarketModule' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {}
