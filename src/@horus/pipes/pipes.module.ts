import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActionTranslationObjectPipe } from '@horus/pipes/action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from '@horus/pipes/check-translation-object.pipe';
import { CurrencyFormatPipe } from '@horus/pipes/currency-format.pipe';
import { GetCollectionObjectValuePipe } from '@horus/pipes/get-collection-object-value.pipe';
import { GetPermissionActionsPipe } from '@horus/pipes/get-permission-actions.pipe';
import { SizeFormatPipe } from '@horus/pipes/size-format.pipe';
import { NumbersArrayPipe } from '@horus/pipes/numbers-array.pipe';
import { SortByPipe } from '@horus/pipes/sort-by.pipe';
import { ValuesArrayPipe } from '@horus/pipes/values-array.pipe';
import { NumberFormatPipe } from '@horus/pipes/number-format.pipe';
import { MustTranslatePipe } from '@horus/pipes/must-translate.pipe';
import { SumByPipe } from '@horus/pipes/sum-by.pipe';
import { DdPipe } from '@horus/pipes/dd.pipe';

@NgModule({
    providers: [
        DecimalPipe,
        NumberFormatPipe
    ],
    declarations: [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CurrencyFormatPipe,
        DdPipe,
        GetCollectionObjectValuePipe,
        GetPermissionActionsPipe,
        SizeFormatPipe,
        MustTranslatePipe,
        NumbersArrayPipe,
        NumberFormatPipe,
        SortByPipe,
        SumByPipe,
        ValuesArrayPipe
    ],
    imports     : [],
    exports     : [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CurrencyFormatPipe,
        DdPipe,
        GetCollectionObjectValuePipe,
        GetPermissionActionsPipe,
        SizeFormatPipe,
        MustTranslatePipe,
        NumbersArrayPipe,
        NumberFormatPipe,
        SortByPipe,
        SumByPipe,
        ValuesArrayPipe
    ]
})
export class PipesModule
{
}
