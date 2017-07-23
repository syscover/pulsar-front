import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { CrmRoutingModule } from './crm-routing.module';
import { GroupListComponent } from './group/group-list.component';
import { GroupDetailComponent } from './group/group-detail.component';
import { GroupGraphQLService } from './group/group-graphql.service';


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
        GroupGraphQLService
    ]
})

export class CrmModule {
    constructor() {}
}
