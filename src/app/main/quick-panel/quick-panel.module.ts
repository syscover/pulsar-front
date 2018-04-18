import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDividerModule, MatListModule, MatSlideToggleModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseQuickPanelComponent } from 'app/main/quick-panel/quick-panel.component';

// DH2
import { FuseTranslationLoaderService } from './../../../@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { SharedModule } from './../content/core/modules/shared.module';

@NgModule({
    declarations: [
        FuseQuickPanelComponent
    ],
    imports     : [
        RouterModule,

        MatDividerModule,
        MatListModule,
        MatSlideToggleModule,

        FuseSharedModule,
        SharedModule
    ],
    exports: [
        FuseQuickPanelComponent
    ]
})
export class FuseQuickPanelModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    )
    {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
