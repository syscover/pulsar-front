import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { CrmRoutingModule } from './crm-routing.module';

import { GroupListComponent } from './groups/group-list.component';
import { GroupDetailComponent } from './groups/group-detail.component';

import { GroupService } from './groups/group.service';

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

export class MarketModule {
    constructor() {}
}
