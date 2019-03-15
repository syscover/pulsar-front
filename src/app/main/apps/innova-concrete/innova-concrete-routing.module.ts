import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '../../core/services/authorization.service';

import { CharacteristicDetailComponent } from './characteristic/characteristic-detail.component';
import { CharacteristicListComponent } from './characteristic/characteristic-list.component';
import { GroupDetailComponent } from './group/group-detail.component';
import { GroupListComponent } from './group/group-list.component';
import { TypeDetailComponent } from './type/type-detail.component';
import { TypeListComponent } from './type/type-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        canActivateChild: [AuthorizationService],
        children: [
            // characteristic
            { path: 'characteristic',                                   component: CharacteristicListComponent,         data: { action: 'list', resource: 'admin-user' }},
            { path: 'characteristic/create',                            component: CharacteristicDetailComponent,       data: { action: 'create', resource: 'admin-user' }},
            { path: 'characteristic/show/:id',                          component: CharacteristicDetailComponent,       data: { action: 'edit', resource: 'admin-user' }},

            // group
            { path: 'group',                                            component: GroupListComponent,                  data: { action: 'list', resource: 'admin-user' }},
            { path: 'group/create',                                     component: GroupDetailComponent,                data: { action: 'create', resource: 'admin-user' }},
            { path: 'group/show/:id',                                   component: GroupDetailComponent,                data: { action: 'edit', resource: 'admin-user' }},

            // Type
            { path: 'type',                                             component: TypeListComponent,                   data: { action: 'list', resource: 'admin-user' }},
            { path: 'type/create',                                      component: TypeDetailComponent,                 data: { action: 'create', resource: 'admin-user' }},
            { path: 'type/show/:id',                                    component: TypeDetailComponent,                 data: { action: 'edit', resource: 'admin-user' }}
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InnovaConcreteRoutingModule {}
