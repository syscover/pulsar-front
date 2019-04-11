import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatTableModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { ItemDialogComponent } from './item-dialog.component';
import { ListItemsComponent } from './list-items.component';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

@NgModule({
    declarations: [
        ItemDialogComponent,
        ListItemsComponent
    ],
    exports: [
        ItemDialogComponent,
        ListItemsComponent
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatTableModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    entryComponents: [
        ItemDialogComponent
    ]
})
export class ListItemsModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
