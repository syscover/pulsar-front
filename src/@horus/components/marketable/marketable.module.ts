import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
 } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { MarketableComponent } from '@horus/components/marketable/marketable.component';
import { SlugModule } from '@horus/components/slug/slug.module';
import { SpinnerModule } from '@horus/components/spinner/spinner.module';
import { PipesModule } from '@horus/pipes/pipes.module';
import { FlagIconModule } from '@horus/components/flag-icon/flag-icon.module';
import { MarketableService } from '@horus/components/marketable/marketable.service';
import { CategoryDialogComponent } from '@horus/components/marketable/category-dialog.component';
import { locale as english } from '@horus/components/marketable/i18n/en';
import { locale as spanish } from '@horus/components/marketable/i18n/es';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';


// font awesome icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

@NgModule({
    declarations: [
        CategoryDialogComponent,
        MarketableComponent
    ],
    imports: [
        CommonModule,
        FlagIconModule,
        FlexLayoutModule,
        FontAwesomeModule,
        FormsModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDialogModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        PipesModule,
        ReactiveFormsModule,
        SlugModule,
        SpinnerModule,
        TranslateModule
    ],
    exports: [
        MarketableComponent
    ],
    providers: [
        MarketableService
    ],
    entryComponents: [
        CategoryDialogComponent
    ]
})
export class MarketableModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
