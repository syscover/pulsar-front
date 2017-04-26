import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { CrmRoutingModule } from './crm-routing.module';

import { GroupListComponent } from './group/group-list.component';
import { GroupDetailComponent } from './group/group-detail.component';

import { GroupService } from './group/group.service';

@NgModule({
    imports: [
        SharedModule,
        CrmRoutingModule
    ],
    declarations: [
        GroupListComponent,
        GroupDetailComponent
    ],
    providers: [
       GroupService
    ]
})

export class CrmModule {
    constructor() {}
}
