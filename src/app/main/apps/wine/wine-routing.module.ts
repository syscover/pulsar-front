import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { AppellationDetailComponent } from './appellation/appellation-detail.component';
import { AppellationListComponent } from './appellation/appellation-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';
import { FamilyListComponent } from './family/family-list.component';
import { GrapeDetailComponent } from './grape/grape-detail.component';
import { GrapeListComponent } from './grape/grape-list.component';
import { TypeDetailComponent } from './type/type-detail.component';
import { TypeListComponent } from './type/type-list.component';
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

            // Family
            { path: 'family',                                                       component: FamilyListComponent },
            { path: 'family/create',                                                component: FamilyDetailComponent,                       data: { action: 'create' }},
            { path: 'family/create/:lang_id/:id',                                   component: FamilyDetailComponent,                       data: { action: 'create-lang' }},
            { path: 'family/show/:lang_id/:id',                                     component: FamilyDetailComponent,                       data: { action: 'edit' }},

            // Grape
            { path: 'grape',                                                        component: GrapeListComponent },
            { path: 'grape/create',                                                 component: GrapeDetailComponent,                        data: { action: 'create' }},
            { path: 'grape/create/:lang_id/:id',                                    component: GrapeDetailComponent,                        data: { action: 'create-lang' }},
            { path: 'grape/show/:lang_id/:id',                                      component: GrapeDetailComponent,                        data: { action: 'edit' }},

            // Type
            { path: 'type',                                                         component: TypeListComponent },
            { path: 'type/create',                                                  component: TypeDetailComponent,                         data: { action: 'create' }},
            { path: 'type/create/:lang_id/:id',                                     component: TypeDetailComponent,                         data: { action: 'create-lang' }},
            { path: 'type/show/:lang_id/:id',                                       component: TypeDetailComponent,                         data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class WineRoutingModule {}
