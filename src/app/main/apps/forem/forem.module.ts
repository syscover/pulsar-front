import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from '@horus/modules/shared.module';
import { ForemRoutingModule } from './forem-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { ActionDetailComponent } from './action/action-detail.component';
import { ActionListComponent } from './action/action-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { CategoryListComponent } from './category/category-list.component';
import { EmploymentOfficeListComponent } from './employment-office/employment-office-list.component';
import { EmploymentOfficeDetailComponent } from './employment-office/employment-office-detail.component';
import { CategoryDialogComponent } from './category/category-dialog.component';
import { ExpedientDetailComponent } from './expedient/expedient-detail.component';
import { ExpedientListComponent } from './expedient/expedient-list.component';
import { GroupDetailComponent } from './group/group-detail.component';
import { GroupListComponent } from './group/group-list.component';
import { GroupHistoryListComponent } from './group/group-history-list.component';
import { InscriptionDetailComponent } from './inscription/inscription-detail.component';
import { InscriptionExportDialogComponent } from './inscription/inscription-export-dialog.component';
import { InscriptionListComponent } from './inscription/inscription-list.component';
import { LocalityDetailComponent } from './locality/locality-detail.component';
import { LocalityListComponent } from './locality/locality-list.component';
import { MatriculateDetailComponent } from './matriculate/matriculate-detail.component';
import { ProfileDetailComponent } from './profile/profile-detail.component';
import { ProfileListComponent } from './profile/profile-list.component';
import { ProvinceDetailComponent } from './province/province-detail.component';
import { ProvinceListComponent } from './province/province-list.component';
import { TrainerDetailComponent } from './trainer/trainer-detail.component';
import { TrainerListComponent } from './trainer/trainer-list.component';

@NgModule({
    imports: [
        SharedModule,
        ForemRoutingModule,
        
    ],
    exports: [ ],
    declarations: [
        ActionDetailComponent,
        ActionListComponent,
        CategoryDetailComponent,
        CategoryDialogComponent,
        CategoryListComponent,
        EmploymentOfficeDetailComponent,
        EmploymentOfficeListComponent,
        ExpedientDetailComponent,
        ExpedientListComponent,
        GroupDetailComponent,
        GroupListComponent,
        GroupHistoryListComponent,
        InscriptionDetailComponent,
        InscriptionExportDialogComponent,
        InscriptionListComponent,
        LocalityDetailComponent,
        LocalityListComponent,
        MatriculateDetailComponent,
        ProfileDetailComponent,
        ProfileListComponent,
        ProvinceDetailComponent,
        ProvinceListComponent,
        TrainerListComponent,
        TrainerDetailComponent
    ],

    providers: [],
    entryComponents: [
        CategoryDialogComponent,
        InscriptionExportDialogComponent
    ]
})

export class ForemModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
