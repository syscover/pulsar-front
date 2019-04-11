import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '@horus/services/authorization.service';

import { AppellationDetailComponent } from './appellation/appellation-detail.component';
import { AppellationListComponent } from './appellation/appellation-list.component';
import { AwardDetailComponent } from './award/award-detail.component';
import { AwardListComponent } from './award/award-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';
import { FamilyListComponent } from './family/family-list.component';
import { GrapeDetailComponent } from './grape/grape-detail.component';
import { GrapeListComponent } from './grape/grape-list.component';
import { PairingDetailComponent } from './pairing/pairing-detail.component';
import { PairingListComponent } from './pairing/pairing-list.component';
import { PresentationDetailComponent } from './presentation/presentation-detail.component';
import { PresentationListComponent } from './presentation/presentation-list.component';
import { TypeDetailComponent } from './type/type-detail.component';
import { TypeListComponent } from './type/type-list.component';
import { WineDetailComponent } from './wine/wine-detail.component';
import { WineListComponent } from './wine/wine-list.component';
import { WineryDetailComponent } from './winery/winery-detail.component';
import { WineryListComponent } from './winery/winery-list.component';
import {ActionListComponent} from '../forem/action/action-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [

            // Appellation
            { path: 'appellation',                                                  component: AppellationListComponent,                    data: { action: 'list' }},
            { path: 'appellation/create',                                           component: AppellationDetailComponent,                  data: { action: 'create' }},
            { path: 'appellation/create/:lang_id/:id',                              component: AppellationDetailComponent,                  data: { action: 'create-lang' }},
            { path: 'appellation/show/:lang_id/:id',                                component: AppellationDetailComponent,                  data: { action: 'edit' }},

            // Award
            { path: 'award',                                                        component: AwardListComponent,                          data: { action: 'list' }},
            { path: 'award/create',                                                 component: AwardDetailComponent,                        data: { action: 'create' }},
            { path: 'award/create/:lang_id/:id',                                    component: AwardDetailComponent,                        data: { action: 'create-lang' }},
            { path: 'award/show/:lang_id/:id',                                      component: AwardDetailComponent,                        data: { action: 'edit' }},

            // Family
            { path: 'family',                                                       component: FamilyListComponent,                         data: { action: 'list' }},
            { path: 'family/create',                                                component: FamilyDetailComponent,                       data: { action: 'create' }},
            { path: 'family/create/:lang_id/:id',                                   component: FamilyDetailComponent,                       data: { action: 'create-lang' }},
            { path: 'family/show/:lang_id/:id',                                     component: FamilyDetailComponent,                       data: { action: 'edit' }},

            // Grape
            { path: 'grape',                                                        component: GrapeListComponent,                          data: { action: 'list' }},
            { path: 'grape/create',                                                 component: GrapeDetailComponent,                        data: { action: 'create' }},
            { path: 'grape/create/:lang_id/:id',                                    component: GrapeDetailComponent,                        data: { action: 'create-lang' }},
            { path: 'grape/show/:lang_id/:id',                                      component: GrapeDetailComponent,                        data: { action: 'edit' }},

            // Pairing
            { path: 'pairing',                                                      component: PairingListComponent,                        data: { action: 'list' }},
            { path: 'pairing/create',                                               component: PairingDetailComponent,                      data: { action: 'create' }},
            { path: 'pairing/create/:lang_id/:id',                                  component: PairingDetailComponent,                      data: { action: 'create-lang' }},
            { path: 'pairing/show/:lang_id/:id',                                    component: PairingDetailComponent,                      data: { action: 'edit' }},

            // Presentation
            { path: 'presentation',                                                 component: PresentationListComponent,                   data: { action: 'list' }},
            { path: 'presentation/create',                                          component: PresentationDetailComponent,                 data: { action: 'create' }},
            { path: 'presentation/create/:lang_id/:id',                             component: PresentationDetailComponent,                 data: { action: 'create-lang' }},
            { path: 'presentation/show/:lang_id/:id',                               component: PresentationDetailComponent,                 data: { action: 'edit' }},

            // Type
            { path: 'type',                                                         component: TypeListComponent,                           data: { action: 'list' }},
            { path: 'type/create',                                                  component: TypeDetailComponent,                         data: { action: 'create' }},
            { path: 'type/create/:lang_id/:id',                                     component: TypeDetailComponent,                         data: { action: 'create-lang' }},
            { path: 'type/show/:lang_id/:id',                                       component: TypeDetailComponent,                         data: { action: 'edit' }},

            // Wines
            { path: 'wine',                                                         component: WineListComponent,                           data: { action: 'list' }},
            { path: 'wine/create',                                                  component: WineDetailComponent,                         data: { action: 'create' }},
            { path: 'wine/create/:lang_id/:id',                                     component: WineDetailComponent,                         data: { action: 'create-lang' }},
            { path: 'wine/show/:lang_id/:id',                                       component: WineDetailComponent,                         data: { action: 'edit' }},

            // Wineries
            { path: 'winery',                                                       component: WineryListComponent,                         data: { action: 'list' }},
            { path: 'winery/create',                                                component: WineryDetailComponent,                       data: { action: 'create' }},
            { path: 'winery/create/:lang_id/:id',                                   component: WineryDetailComponent,                       data: { action: 'create-lang' }},
            { path: 'winery/show/:lang_id/:id',                                     component: WineryDetailComponent,                       data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WineRoutingModule {}
