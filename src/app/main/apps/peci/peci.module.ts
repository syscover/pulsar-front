import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from '@horus/modules/shared.module';
import { PeciRoutingModule } from './peci-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { FileDetailComponent } from './file/file-detail.component';
import { FileListComponent } from './file/file-list.component';
import { RecordDetailComponent } from './record/record-detail.component';
import { RecordListComponent } from './record/record-list.component';

@NgModule({
    imports: [
        SharedModule,
        PeciRoutingModule
    ],
    exports: [ ],
    declarations: [
        FileDetailComponent,
        FileListComponent,
        RecordDetailComponent,
        RecordListComponent,
    ],
    providers: [],
    entryComponents: [
    ]
})

export class PeciModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
