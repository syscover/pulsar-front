import { NgModule } from '@angular/core';
import { ActionTranslationObjectPipe } from './../pipes/action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from './../pipes/check-translation-object.pipe';

@NgModule({
    declarations: [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe
    ],
    providers: [],
    imports: [],
    exports: [
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe
    ]
})
export class SharedModule
{ }
