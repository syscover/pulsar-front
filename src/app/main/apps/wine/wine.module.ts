import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { WineRoutingModule } from './wine-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { WineListComponent } from './wine/wine-list.component';
import { WineDetailComponent } from './wine/wine-detail.component';

@NgModule({
    imports: [
        SharedModule,
        WineRoutingModule
    ],
    exports: [ ],
    declarations: [
        WineListComponent,
        WineDetailComponent
    ],
    providers: []
})

export class WineModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
