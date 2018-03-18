import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatProgressBarModule, MatToolbarModule } from '@angular/material';

import { FuseTranslationLoaderService } from './../../../@fuse/services/translation-loader.service';
import { FuseToolbarComponent } from 'app/main/toolbar/toolbar.component';
import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';
import { SharedModule } from './../content/core/modules/shared.module';

@NgModule({
    declarations: [
        FuseToolbarComponent
    ],
    imports     : [
        RouterModule,

        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatToolbarModule,

        FuseSearchBarModule,
        FuseShortcutsModule,

        SharedModule
    ],
    exports     : [
        FuseToolbarComponent
    ]
})
export class FuseToolbarModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    )
    {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
