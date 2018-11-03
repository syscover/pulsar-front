import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { WineListComponent } from './wine/wine-list.component';
import { WineDetailComponent } from './wine/wine-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Wines
            { path: 'wine',                                                         component: WineListComponent },
            { path: 'wine/create',                                                  component: WineDetailComponent,                          data: { action: 'create' }},
            //{ path: 'wine/create/:lang_id/:id/:product_id',                         component: WineDetailComponent,                          data: { action: 'create-lang' }},
            { path: 'wine/create/:lang_id/:id',                                     component: WineDetailComponent,                          data: { action: 'create-lang' }},
            //{ path: 'wine/show/:lang_id/:id/:product_id',                           component: WineDetailComponent,                          data: { action: 'edit' }},
            { path: 'wine/show/:lang_id/:id',                                       component: WineDetailComponent,                          data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WineRoutingModule {}
