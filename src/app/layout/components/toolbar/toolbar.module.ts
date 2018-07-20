import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';

// DH2
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from 'app/navigation/i18n/en';
import { locale as spanish } from 'app/navigation/i18n/es';
import { SharedModule } from 'app/main/core/modules/shared.module';

@NgModule({
    declarations: [
        ToolbarComponent
    ],
    imports     : [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,

        FuseSharedModule,
        FuseSearchBarModule,
        FuseShortcutsModule,

        // DH2
        SharedModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
    // DH2
    constructor(
        private translationLoader: FuseTranslationLoaderService
    )
    {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
