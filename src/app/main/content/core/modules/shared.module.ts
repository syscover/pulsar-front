import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionTranslationObjectPipe } from './../pipes/action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from './../pipes/check-translation-object.pipe';
import { FlagIconComponent } from './../components/flag-icon.component';

@NgModule({
    declarations: [
        FlagIconComponent,
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe
    ],
    providers: [],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        FlagIconComponent,
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe
    ]
})
export class SharedModule
{ }
