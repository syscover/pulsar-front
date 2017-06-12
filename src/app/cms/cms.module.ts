import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { CmsRoutingModule } from './cms-routing.module';

import { FamilyListComponent } from './family/family-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';

import { FamilyService } from './family/family.service';

@NgModule({
    imports: [
        SharedModule,
        CmsRoutingModule
    ],
    declarations: [
        FamilyListComponent,
        FamilyDetailComponent
    ],
    providers: [
       FamilyService
    ]
})


export class CmsModule {
    constructor() {}
}
