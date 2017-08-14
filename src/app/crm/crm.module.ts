import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { CrmRoutingModule } from './crm-routing.module';
import { CustomerGraphQLService } from './customer/customer-graphql.service';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { GroupDetailComponent } from './group/group-detail.component';
import { GroupGraphQLService } from './group/group-graphql.service';
import { GroupListComponent } from './group/group-list.component';


@NgModule({
    imports: [
        SharedModule,
        CrmRoutingModule
    ],
    declarations: [
        CustomerListComponent,
        CustomerDetailComponent,
        GroupListComponent,
        GroupDetailComponent
    ],
    providers: [
        CustomerGraphQLService,
        GroupGraphQLService
    ]
})

export class CrmModule {
    constructor() {}
}
