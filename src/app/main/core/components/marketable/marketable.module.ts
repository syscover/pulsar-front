import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketableComponent } from './marketable.component';
import {
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from '../../directives/directives.module';
import { MarketableService } from './marketable.service';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        FlexLayoutModule,
        FormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        PipesModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        MarketableComponent
    ],
    declarations: [
        MarketableComponent
    ],
    providers: [
        MarketableService
    ]
})
export class MarketableModule
{
}
