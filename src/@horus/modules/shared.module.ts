import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { AttachmentsModule } from '@horus/components/attachments/attachments.module';
import { ComponentsModule } from '@horus/components/components.module';
import { DynamicFormModule } from '@horus/components/dynamic-form/dynamic-form.module';
import { MaterialModule } from '@horus/modules/material.module';
import { CovalentModule } from '@horus/modules/covalent.module';
import { PipesModule } from '@horus/pipes/pipes.module';
import { DirectivesModule } from '@horus/directives/directives.module';
import { SpinnerModule } from '@horus/components/spinner/spinner.module';

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
        MaterialModule,
        PipesModule,
        SpinnerModule,
        TranslateModule,
    ],
    exports: [
        AttachmentsModule,
        ComponentsModule,
        CovalentModule,
        DirectivesModule,
        DynamicFormModule,
        FuseSharedModule,
        FontAwesomeModule,
        MaterialModule,
        PipesModule,
        SpinnerModule,
        TranslateModule,
    ]
})
export class SharedModule {}
