import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '@horus/services/authorization.service';

import { FileListComponent } from './file/file-list.component';
import { FileDetailComponent } from './file/file-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Files
            { path: 'file',                                                            component: FileListComponent,                              data: { action: 'list' }},
            { path: 'file/create',                                                     component: FileDetailComponent,                            data: { action: 'create' }},
            { path: 'file/show/:id',                                                   component: FileDetailComponent,                            data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PeciRoutingModule {}
