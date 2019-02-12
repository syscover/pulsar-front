import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '../../core/services/authorization.service';

import { VersionListComponent } from './version/version-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        canActivateChild: [AuthorizationService],
        children: [
            // Version
            { path: 'version',                                          component: VersionListComponent,                data: { action: 'list', resource: 'update-version' }},
            // { path: 'version/create',                                   component: PackageDetailComponent,              data: { action: 'create', resource: 'update-version' }},
            // { path: 'version/show/:id',                                 component: PackageDetailComponent,              data: { action: 'edit', resource: 'update-version' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class UpdateRoutingModule {}
