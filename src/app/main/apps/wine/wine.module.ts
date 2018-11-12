import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { WineRoutingModule } from './wine-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { AppellationDetailComponent } from './appellation/appellation-detail.component';
import { AppellationDialogComponent } from './appellation/appellation-dialog.component';
import { AppellationListComponent } from './appellation/appellation-list.component';
import { AwardDetailComponent } from './award/award-detail.component';
import { AwardDialogComponent } from './award/award-dialog.component';
import { AwardListComponent } from './award/award-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';
import { FamilyDialogComponent } from './family/family-dialog.component';
import { FamilyListComponent } from './family/family-list.component';
import { GrapeDetailComponent } from './grape/grape-detail.component';
import { GrapeDialogComponent } from './grape/grape-dialog.component';
import { GrapeListComponent } from './grape/grape-list.component';
import { PairingDetailComponent } from './pairing/pairing-detail.component';
import { PairingDialogComponent } from './pairing/pairing-dialog.component';
import { PairingListComponent } from './pairing/pairing-list.component';
import { PresentationDetailComponent } from './presentation/presentation-detail.component';
import { PresentationDialogComponent } from './presentation/presentation-dialog.component';
import { PresentationListComponent } from './presentation/presentation-list.component';
import { TypeDetailComponent } from './type/type-detail.component';
import { TypeDialogComponent } from './type/type-dialog.component';
import { TypeListComponent } from './type/type-list.component';
import { WineDetailComponent } from './wine/wine-detail.component';
import { WineListComponent } from './wine/wine-list.component';
import { WineryDetailComponent } from './winery/winery-detail.component';
import { WineryListComponent } from './winery/winery-list.component';

@NgModule({
    imports: [
        SharedModule,
        WineRoutingModule
    ],
    exports: [ ],
    declarations: [
        AppellationDetailComponent,
        AppellationDialogComponent,
        AppellationListComponent,
        AwardDetailComponent,
        AwardDialogComponent,
        AwardListComponent,
        FamilyDetailComponent,
        FamilyDialogComponent,
        FamilyListComponent,
        GrapeDetailComponent,
        GrapeDialogComponent,
        GrapeListComponent,
        PairingDetailComponent,
        PairingDialogComponent,
        PairingListComponent,
        PresentationDetailComponent,
        PresentationDialogComponent,
        PresentationListComponent,
        TypeDetailComponent,
        TypeDialogComponent,
        TypeListComponent,
        WineDetailComponent,
        WineListComponent,
        WineryDetailComponent,
        WineryListComponent
    ],
    providers: [],
    entryComponents: [
        AppellationDialogComponent,
        AwardDialogComponent,
        FamilyDialogComponent,
        GrapeDialogComponent,
        PairingDialogComponent,
        PresentationDialogComponent,
        TypeDialogComponent
    ]
})

export class WineModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
