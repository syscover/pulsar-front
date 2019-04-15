import { NgModule } from '@angular/core';
import { CovalentCodeEditorModule } from '@covalent/code-editor';
import { CovalentChipsModule } from '@covalent/core/chips';

@NgModule({
    imports: [
        CovalentChipsModule,
        CovalentCodeEditorModule
    ],
    exports: [
        CovalentChipsModule,
        CovalentCodeEditorModule
    ]
})
export class CovalentModule {}
