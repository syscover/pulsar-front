import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatFormFieldModule, MatIconModule } from '@angular/material';
import { AttachmentsModule } from './attachments/attachments.module';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { FroalaModule } from './froala/froala.module';
import { ImageInputModule } from './image-input/image-input.module';
import { LocationMapModule } from './location-map/location-map.module';
import { MarketableModule } from './marketable/marketable.module';
import { TerritoriesModule } from './territories/territories.module';
import { StockableModule } from './stockable/stockable.module';
import {FlagIconModule} from './flag-icon/flag-icon.module';

@NgModule({
    imports: [
        AttachmentsModule,
        CommonModule,
        FlagIconModule,
        FroalaModule,
        ImageInputModule,
        LocationMapModule,
        MarketableModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatIconModule,
        TerritoriesModule,
        StockableModule
    ],
    exports: [
        AttachmentsModule,
        ConfirmationDialogComponent,
        FlagIconModule,
        FroalaModule,
        ImageInputModule,
        LocationMapModule,
        MarketableModule,
        TerritoriesModule,
        StockableModule
    ],
    declarations: [
        ConfirmationDialogComponent
    ],
    entryComponents: [
        ConfirmationDialogComponent
    ]
})
export class ComponentsModule
{
}
