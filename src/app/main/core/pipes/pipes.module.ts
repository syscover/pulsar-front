import { NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ActionTranslationObjectPipe } from './action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from './check-translation-object.pipe';
import { CurrencyFormatPipe } from './currency-format.pipe';
import { GetCollectionObjectValuePipe } from './get-collection-object-value.pipe';
import { GetPermissionActionsPipe } from './get-permission-actions.pipe';
import { SizeFormatPipe } from './size-format.pipe';
import { NumbersArrayPipe } from './numbers-array.pipe';
import { SortByPipe } from './sort-by.pipe';
import { ValuesArrayPipe } from './values-array.pipe';
import { NumberFormatPipe } from './number-format.pipe';
import { MustTranslatePipe } from './must-translate.pipe';
import { SumByPipe } from './sum-by.pipe';
import { DdPipe } from './dd.pipe';

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
