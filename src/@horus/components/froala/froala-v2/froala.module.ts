import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { FroalaComponent } from './froala.component';
// import 'froala-editor/js/froala_editor.pkgd.min.js';

@NgModule({
    imports: [
        CommonModule,
  //      FroalaEditorModule.forRoot(),
  //      FroalaViewModule.forRoot()
    ],
    exports: [
        FroalaComponent
    ],
    declarations: [
        FroalaComponent
    ],
    providers: [],
})
export class FroalaModule {}
