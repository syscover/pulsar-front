import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { FuseSearchBarModule, FuseShortcutsModule } from '@fuse/components';
import { FuseSharedModule } from '@fuse/shared.module';

import { ToolbarComponent } from 'app/layout/components/toolbar/toolbar.component';

// @horus
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from 'app/navigation/i18n/en';
import { locale as spanish } from 'app/navigation/i18n/es';
import { SharedModule } from '@horus/modules/shared.module';


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

        // @horus
        SharedModule
    ],
    exports     : [
        ToolbarComponent
    ]
})
export class ToolbarModule
{
    // @horus
    constructor(
        private translationLoader: FuseTranslationLoaderService
    )
    {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
