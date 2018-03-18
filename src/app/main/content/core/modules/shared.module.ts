import { FuseSharedModule } from './../../../../../@fuse/shared.module';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from './material.module';
import { ConfirmationDialogComponent } from './../components/confirmation-dialog.component';
import { ActionTranslationObjectPipe } from './../pipes/action-trasnlation-object.pipe';
import { CheckTranslationObjectPipe } from './../pipes/check-translation-object.pipe';
import { CollectionObjectValuePipe } from './../pipes/collection-object-value.pipe';
import { FlagIconComponent } from './../components/flag-icon.component';


@NgModule({
    declarations: [
        FlagIconComponent,
        ConfirmationDialogComponent,
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe,
    ],
    providers: [],
    imports: [
        FuseSharedModule,
        TranslateModule,
        MaterialModule
    ],
    exports: [
        FuseSharedModule,
        TranslateModule,
        MaterialModule,
        FlagIconComponent,
        ActionTranslationObjectPipe,
        CheckTranslationObjectPipe,
        CollectionObjectValuePipe
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ],
})
export class SharedModule
{ 
}
