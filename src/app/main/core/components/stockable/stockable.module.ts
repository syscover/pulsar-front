import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '../../../../../@fuse/services/translation-loader.service';
import { StockableComponent } from './stockable.component';
import { StockGraphQLService } from '../../../apps/market/stock/stock-graphql.service';
import { StockableService } from './stockable.service';
import { StockableDialogComponent } from './stockable-dialog.component';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@NgModule({
    imports: [
        CommonModule,
        // FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        // MatCheckboxModule,
        MatDialogModule,
        MatTableModule,
        MatFormFieldModule,
        // MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,

        MatSortModule,
        // MatSelectModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        StockableComponent
    ],
    declarations: [
        StockableDialogComponent,
        StockableComponent
    ],
    providers: [
        StockGraphQLService,
        StockableService
    ],
    entryComponents: [
        StockableDialogComponent
    ]
})
export class StockableModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
