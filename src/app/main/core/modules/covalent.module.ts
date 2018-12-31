import { NgModule } from '@angular/core';
import { CovalentCodeEditorModule } from '@covalent/code-editor';

@NgModule({
    imports: [
        CovalentCodeEditorModule
    ],
    exports: [
        CovalentCodeEditorModule
    ],
    providers: []
})
export class CovalentModule
{}
