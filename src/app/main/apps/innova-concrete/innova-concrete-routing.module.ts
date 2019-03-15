import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '../../core/services/authorization.service';
import {TypeListComponent} from './type/type-list.component';

// import { UserListComponent } from './user/user-list.component';
// import { UserDetailComponent } from './user/user-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        canActivateChild: [AuthorizationService],
        children: [
            // Type
            { path: 'type',                                             component: TypeListComponent,                   data: { action: 'list', resource: 'admin-user' }},
            // { path: 'type/create',                                      component: ,                 data: { action: 'create', resource: 'admin-user' }},
            // { path: 'type/show/:id',                                    component: UserDetailComponent,                 data: { action: 'edit', resource: 'admin-user' }}
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InnovaConcreteRoutingModule {}
