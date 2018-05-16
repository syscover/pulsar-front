import { NgModule } from '@angular/core';
import { ActionTranslationObjectPipe } from './action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from './check-translation-object.pipe';
import { CollectionObjectValuePipe } from './collection-object-value.pipe';
import { FormatSizePipe } from './format-size.pipe';
import { NumbersArrayPipe } from './numbers-array.pipe';
import { SortByPipe } from './sort-by.pipe';
import { ValuesArrayPipe } from './values-array.pipe';

@NgModule({
    imports     : [],
    exports     : [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe,
        FormatSizePipe,
        NumbersArrayPipe,
        SortByPipe,
        ValuesArrayPipe
    ],
    declarations: [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe,
        FormatSizePipe,
        NumbersArrayPipe,
        SortByPipe,
        ValuesArrayPipe
    ]
})
export class PipesModule
{
}
