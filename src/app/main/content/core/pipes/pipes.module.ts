import { NgModule } from '@angular/core';
import { ActionTranslationObjectPipe } from './action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from './check-translation-object.pipe';
import { CollectionObjectValuePipe } from './collection-object-value.pipe';
import { FormatSizePipe } from './format-size.pipe';

@NgModule({
    imports     : [],
    exports     : [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe,
        FormatSizePipe
    ],
    declarations: [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe,
        FormatSizePipe
    ]
})
export class PipesModule
{
}
