import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FuseSharedModule } from './../../../../../@fuse/shared.module';
import { AttachmentsModule } from './../components/attachments/attachments.module';
import { ComponentsModule } from './../components/components.module';
import { MaterialModule } from './material.module';
import { PipesModule } from './../pipes/pipes.module';
import { DirectivesModule } from './../directives/directives.module';

@NgModule({
    imports: [
        AttachmentsModule,
        ComponentsModule,
        DirectivesModule,
        FuseSharedModule,
        TranslateModule,
        MaterialModule,
        PipesModule
    ],
    exports: [
        AttachmentsModule,
        ComponentsModule,
        DirectivesModule,
        FuseSharedModule,
        TranslateModule,
        MaterialModule,
        PipesModule
    ]
})
export class SharedModule
{ 
}
