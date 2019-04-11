import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '@horus/services/authorization.service';

import { SappiIcListComponent} from './sappi-ic/sappi-ic-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        canActivateChild: [AuthorizationService],
        children: [
            // SappiIc
            { path: 'sappi-ic',                                          component: SappiIcListComponent,                data: { action: 'list', resource: 'bcci-sappi-ic' }},
            // { path: 'sappi-ic/create',                                   component: PackageDetailComponent,              data: { action: 'create', resource: 'bcci-sappi-ic' }},
            // { path: 'sappi-ic/show/:id',                                 component: PackageDetailComponent,              data: { action: 'edit', resource: 'bcci-sappi-ic' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class BcciRoutingModule {}
