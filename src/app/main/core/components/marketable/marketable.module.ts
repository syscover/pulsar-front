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
import { MarketableService } from './marketable.service';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
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
    providers: [
        // MarketableService
    ]
})
export class MarketableModule
{
}
