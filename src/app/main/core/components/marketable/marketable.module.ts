import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketableComponent } from './marketable.component';
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
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { SpinnerModule } from '../spinner/spinner.module';
import { FlagIconModule } from '../flag-icon/flag-icon.module';
import { FuseTranslationLoaderService } from '../../../../../@fuse/services/translation-loader.service';
import { DirectivesModule } from '../../directives/directives.module';
import { MarketableService } from './marketable.service';
import { PipesModule } from '../../pipes/pipes.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { CategoryDialogComponent } from './category-dialog.component';

// font awesome icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
library.add(fas, far, fab);

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
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
        SpinnerModule,
        TranslateModule
    ],
    exports: [
        MarketableComponent
    ],
    declarations: [
        CategoryDialogComponent,
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
