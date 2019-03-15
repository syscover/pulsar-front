import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '../../core/services/authorization.service';

import { TypeDetailComponent } from './type/type-detail.component';
import { TypeListComponent } from './type/type-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        canActivateChild: [AuthorizationService],
        children: [
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
