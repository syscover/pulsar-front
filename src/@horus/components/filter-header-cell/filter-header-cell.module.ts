import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatMenuModule, MatInputModule, MatIconModule, MatSelectModule, MatTableModule, MatSortModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { FilterHeaderCellComponent } from '@horus/components/filter-header-cell/filter-header-cell.component';
import { FilterItemDirective } from '@horus/components/filter-header-cell/filter-item.directive';
import { locale as english } from '@horus/components/filter-header-cell/i18n/en';
import { locale as spanish } from '@horus/components/filter-header-cell/i18n/es';

@NgModule({
    declarations: [
        FilterHeaderCellComponent,
        FilterItemDirective
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        TranslateModule
    ],
    exports: [
        FilterHeaderCellComponent,
        FilterItemDirective
    ],
    providers: [],
})
export class FilterHeaderCellModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ) {
        this.translationLoader.loadTranslations(english, spanish);
    }
}
