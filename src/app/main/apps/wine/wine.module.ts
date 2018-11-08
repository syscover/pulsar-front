import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { WineRoutingModule } from './wine-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { AppellationDetailComponent } from './appellation/appellation-detail.component';
import { AppellationListComponent } from './appellation/appellation-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';
import { FamilyListComponent } from './family/family-list.component';
import { GrapeDetailComponent } from './grape/grape-detail.component';
import { GrapeListComponent } from './grape/grape-list.component';
import { PairingDetailComponent } from './pairing/pairing-detail.component';
import { PairingListComponent } from './pairing/pairing-list.component';
import { TypeDetailComponent } from './type/type-detail.component';
import { TypeListComponent } from './type/type-list.component';
import { WineDetailComponent } from './wine/wine-detail.component';
import { WineListComponent } from './wine/wine-list.component';

@NgModule({
    imports: [
        SharedModule,
        WineRoutingModule
    ],
    exports: [ ],
    declarations: [
        AppellationDetailComponent,
        AppellationListComponent,
        FamilyDetailComponent,
        FamilyListComponent,
        GrapeDetailComponent,
        GrapeListComponent,
        PairingDetailComponent,
        PairingListComponent,
        TypeDetailComponent,
        TypeListComponent,
        WineDetailComponent,
        WineListComponent
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
