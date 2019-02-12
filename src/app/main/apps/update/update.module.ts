import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from '../../core/modules/shared.module';
import { UpdateRoutingModule } from './update-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { VersionListComponent } from './version/version-list.component';

@NgModule({
    imports: [
        SharedModule,
        UpdateRoutingModule
    ],
    exports: [ ],
    declarations: [
        VersionListComponent
        // PackageDetailComponent,
    ],
    providers: []
})

export class UpdateModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
