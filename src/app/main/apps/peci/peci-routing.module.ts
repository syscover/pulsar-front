import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '@horus/services/authorization.service';

import { FileListComponent } from './file/file-list.component';
import { FileDetailComponent } from './file/file-detail.component';
import { RecordDetailComponent } from './record/record-detail.component';
import { RecordListComponent } from './record/record-list.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Files
            { path: 'file',                                                            component: FileListComponent,                              data: { action: 'list' }},
            { path: 'file/create',                                                     component: FileDetailComponent,                            data: { action: 'create' }},
            { path: 'file/show/:id',                                                   component: FileDetailComponent,                            data: { action: 'edit' }},

            // Record
            { path: 'record',                                                      component: RecordListComponent,                              data: { action: 'list' }},
            { path: 'record/create',                                               component: RecordDetailComponent,                            data: { action: 'create' }},
            { path: 'record/show/:id',                                             component: RecordDetailComponent,                            data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PeciRoutingModule {}
