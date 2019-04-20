import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { LocationMapComponent } from '@horus/components/location-map/location-map.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatInputModule,
        ReactiveFormsModule,
        AgmCoreModule,
        TranslateModule.forChild()
    ],
    exports: [
        LocationMapComponent,
    ],
    declarations: [
        LocationMapComponent
    ],
    providers: [
    ],
})
export class LocationMapModule {}
