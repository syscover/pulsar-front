import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MarketableComponent } from './marketable.component';
import {
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        FlexLayoutModule,
        FormsModule,
        MatCheckboxModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        MarketableComponent
    ],
    declarations: [
        MarketableComponent
    ],
    providers: []
})
export class MarketableModule
{
}
