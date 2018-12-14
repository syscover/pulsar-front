import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { ForemRoutingModule } from './forem-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { EmploymentOfficeListComponent } from './employment-office/employment-office-list.component';
import { EmploymentOfficeDetailComponent } from './employment-office/employment-office-detail.component';

@NgModule({
    imports: [
        SharedModule,
        ForemRoutingModule
    ],
    exports: [ ],
    declarations: [
        EmploymentOfficeDetailComponent,
        EmploymentOfficeListComponent,
    ],
    providers: []
})

export class ForemModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
