import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { CrmRoutingModule } from './crm-routing.module';
import { CustomerGraphQLService } from './customer/customer-graphql.service';
import { CustomerDetailComponent } from './customer/customer-detail.component';
import { CustomerListComponent } from './customer/customer-list.component';
import { GroupDetailComponent } from './group/group-detail.component';
import { GroupGraphQLService } from './group/group-graphql.service';
import { GroupListComponent } from './group/group-list.component';
import { TypeDetailComponent } from './type/type-detail.component';
import { TypeGraphQLService } from './type/type-graphql.service';
import { TypeListComponent } from './type/type-list.component';

@NgModule({
    imports: [
        SharedModule,
        CrmRoutingModule
    ],
    declarations: [
        CustomerListComponent,
        CustomerDetailComponent,
        GroupListComponent,
        GroupDetailComponent,
        TypeListComponent,
        TypeDetailComponent
    ],
    providers: [
        CustomerGraphQLService,
        GroupGraphQLService,
        TypeGraphQLService
    ]
})

export class CrmModule {
    constructor() {}
}
