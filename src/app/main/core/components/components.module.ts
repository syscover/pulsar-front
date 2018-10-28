import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { AttachmentsModule } from './attachments/attachments.module';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { FlagIconComponent } from './flag-icon.component';
import { FroalaModule } from './froala/froala.module';
import { ImageInputModule } from './image-input/image-input.module';
import { LocationMapModule } from './location-map/location-map.module';
import { MarketableModule } from './marketable/marketable.module';
import { TerritoriesModule } from './territories/territories.module';

@NgModule({
    imports: [
        AttachmentsModule,
        CommonModule,
        FroalaModule,
        ImageInputModule,
        LocationMapModule,
        MarketableModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        TerritoriesModule
    ],
    exports: [
        AttachmentsModule,
        ConfirmationDialogComponent,
        FlagIconComponent,
        FroalaModule,
        ImageInputModule,
        LocationMapModule,
        MarketableModule,
        TerritoriesModule
    ],
    declarations: [
        ConfirmationDialogComponent,
        FlagIconComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ]
})
export class ComponentsModule
{
}
