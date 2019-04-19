import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { TerritoriesComponent } from './territories.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        ReactiveFormsModule,
        TranslateModule.forChild()
    ],
    exports: [
        TerritoriesComponent,
    ],
    declarations: [
        TerritoriesComponent
    ],
    providers: [
    ],
})
export class TerritoriesModule {}
