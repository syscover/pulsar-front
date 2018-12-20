import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
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

@NgModule({
    imports: [
        SharedModule,
        ForemRoutingModule
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
    ],
    providers: [],
    entryComponents: [
        CategoryDialogComponent
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
