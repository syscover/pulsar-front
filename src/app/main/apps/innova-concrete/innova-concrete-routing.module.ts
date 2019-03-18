import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '../../core/services/authorization.service';

import { CharacteristicDetailComponent } from './characteristic/characteristic-detail.component';
import { CharacteristicListComponent } from './characteristic/characteristic-list.component';
import { GroupDetailComponent } from './group/group-detail.component';
import { GroupListComponent } from './group/group-list.component';
import { MonumentDetailComponent } from './monument/monument-detail.component';
import { MonumentListComponent } from './monument/monument-list.component';
import { PeopleDetailComponent } from './people/people-detail.component';
import { PeopleListComponent } from './people/people-list.component';
import { TypeDetailComponent } from './type/type-detail.component';
import { TypeListComponent } from './type/type-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        canActivateChild: [AuthorizationService],
        children: [
            // Characteristic
            { path: 'characteristic',                                   component: CharacteristicListComponent,         data: { action: 'list', resource: 'innova-characteristic' }},
            { path: 'characteristic/create',                            component: CharacteristicDetailComponent,       data: { action: 'create', resource: 'innova-characteristic' }},
            { path: 'characteristic/show/:id',                          component: CharacteristicDetailComponent,       data: { action: 'edit', resource: 'innova-characteristic' }},

            // Group
            { path: 'group',                                            component: GroupListComponent,                  data: { action: 'list', resource: 'innova-group' }},
            { path: 'group/create',                                     component: GroupDetailComponent,                data: { action: 'create', resource: 'innova-group' }},
            { path: 'group/show/:id',                                   component: GroupDetailComponent,                data: { action: 'edit', resource: 'innova-group' }},

            // Monument
            { path: 'monument',                                         component: MonumentListComponent,               data: { action: 'list', resource: 'innova-monument' }},
            { path: 'monument/create',                                  component: MonumentDetailComponent,             data: { action: 'create', resource: 'innova-monument' }},
            { path: 'monument/show/:id',                                component: MonumentDetailComponent,             data: { action: 'edit', resource: 'innova-monument' }},

            // People
            { path: 'people',                                           component: PeopleListComponent,                 data: { action: 'list', resource: 'innova-people' }},
            { path: 'people/create',                                    component: PeopleDetailComponent,               data: { action: 'create', resource: 'innova-people' }},
            { path: 'people/show/:id',                                  component: PeopleDetailComponent,               data: { action: 'edit', resource: 'innova-people' }},

            // Type
            { path: 'type',                                             component: TypeListComponent,                   data: { action: 'list', resource: 'innova-type' }},
            { path: 'type/create',                                      component: TypeDetailComponent,                 data: { action: 'create', resource: 'innova-type' }},
            { path: 'type/show/:id',                                    component: TypeDetailComponent,                 data: { action: 'edit', resource: 'innova-type' }}
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InnovaConcreteRoutingModule {}
