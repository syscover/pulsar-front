import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { AppsRoutingModule } from './apps-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@NgModule({
    imports: [
        AppsRoutingModule
    ]
})
export class AppsModule
{
    constructor(
        private _translationLoader: FuseTranslationLoaderService
    ) {
        this._translationLoader.loadTranslations(english, spanish);
    }
}
