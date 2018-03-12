import { MaterialModule } from './../../../../core/modules/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationDialogComponent } from './../components/confirmation-dialog.component';
import { ActionTranslationObjectPipe } from './../pipes/action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from './../pipes/check-translation-object.pipe';
import { FlagIconComponent } from './../components/flag-icon.component';

@NgModule({
    declarations: [
        FlagIconComponent,
        ConfirmationDialogComponent,
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe
    ],
    providers: [],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [
        CommonModule,
        FlagIconComponent,
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ],
})
export class SharedModule
{ 
}
