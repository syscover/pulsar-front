import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { AppellationDetailComponent } from './appellation/appellation-detail.component';
import { AppellationListComponent } from './appellation/appellation-list.component';
import { WineDetailComponent } from './wine/wine-detail.component';
import { WineListComponent } from './wine/wine-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Wines
            { path: 'wine',                                                         component: WineListComponent },
            { path: 'wine/create',                                                  component: WineDetailComponent,                         data: { action: 'create' }},
            { path: 'wine/create/:lang_id/:id',                                     component: WineDetailComponent,                         data: { action: 'create-lang' }},
            { path: 'wine/show/:lang_id/:id',                                       component: WineDetailComponent,                         data: { action: 'edit' }},

            // Appellation
            { path: 'appellation',                                                  component: AppellationListComponent },
            { path: 'appellation/create',                                           component: AppellationDetailComponent,                  data: { action: 'create' }},
            { path: 'appellation/create/:lang_id/:id',                              component: AppellationDetailComponent,                  data: { action: 'create-lang' }},
            { path: 'appellation/show/:lang_id/:id',                                component: AppellationDetailComponent,                  data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WineRoutingModule {}
