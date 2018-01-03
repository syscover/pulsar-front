import { MainComponent } from './main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    { path: 'admin', loadChildren: 'app/modules/admin/admin.module#AdminModule' },
    { path: 'cms', loadChildren: 'app/modules/cms/cms.module#CmsModule' },
    { path: 'crm', loadChildren: 'app/modules/crm/crm.module#CrmModule' },
    { path: 'market', loadChildren: 'app/modules/market/market.module#MarketModule' },
    { path: 'review', loadChildren: 'app/modules/review/review.module#ReviewModule' },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MainRoutingModule {}
