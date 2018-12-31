import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AttachmentsModule } from './../components/attachments/attachments.module';
import { ComponentsModule } from './../components/components.module';
import { DynamicFormModule } from './../components/dynamic-form/dynamic-form.module';
import { MaterialModule } from './material.module';
import { CovalentModule } from './covalent.module';
import { PipesModule } from './../pipes/pipes.module';
import { DirectivesModule } from './../directives/directives.module';
import { SpinnerModule } from './../components/spinner/spinner.module';

// font awesome icons
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

library.add(fas, far, fab);

@NgModule({
    imports: [
        AttachmentsModule,
        ComponentsModule,
        CovalentModule,
        DirectivesModule,
        DynamicFormModule,
        FuseSharedModule,
        FontAwesomeModule,
        SpinnerModule,
        TranslateModule,
        MaterialModule,
        PipesModule
    ],
    exports: [
        AttachmentsModule,
        ComponentsModule,
        CovalentModule,
        DirectivesModule,
        DynamicFormModule,
        FuseSharedModule,
        FontAwesomeModule,
        SpinnerModule,
        TranslateModule,
        MaterialModule,
        PipesModule
    ]
})
export class SharedModule
{ 
}
