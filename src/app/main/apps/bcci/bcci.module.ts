import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from '../../core/modules/shared.module';
import { BcciRoutingModule } from './bcci-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { SappiIcListComponent } from './sappi-ic/sappi-ic-list.component';

@NgModule({
    imports: [
        SharedModule,
        BcciRoutingModule
    ],
    exports: [ ],
    declarations: [
        SappiIcListComponent
    ],
    providers: []
})

export class BcciModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
