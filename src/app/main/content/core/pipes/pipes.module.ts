import { NgModule } from '@angular/core';
import { ActionTranslationObjectPipe } from './action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from './check-translation-object.pipe';
import { CollectionObjectValuePipe } from './collection-object-value.pipe';
import { FormatSizePipe } from './format-size.pipe';
import { SortByPipe } from './sort-by.pipe';

@NgModule({
    imports     : [],
    exports     : [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe,
        FormatSizePipe,
        SortByPipe
    ],
    declarations: [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe,
        FormatSizePipe,
        SortByPipe
    ]
})
export class PipesModule
{
}
