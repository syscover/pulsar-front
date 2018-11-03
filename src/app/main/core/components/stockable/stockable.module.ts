import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule, MatSortModule,
    MatTableModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StockableComponent } from './stockable.component';
import { StockGraphQLService } from '../../../apps/market/stock/stock-graphql.service';
import { StockableService } from './stockable.service';
import { StockableDialogComponent } from './stockable-dialog.component';

@NgModule({
    imports: [
        CommonModule,
        // FlexLayoutModule,
        FormsModule,
        MatButtonModule,
        // MatCheckboxModule,
        MatDialogModule,
        MatTableModule,
        MatFormFieldModule,
        // MatProgressSpinnerModule,
        MatIconModule,
        MatInputModule,

        MatSortModule,
        // MatSelectModule,
        ReactiveFormsModule,
        TranslateModule
    ],
    exports: [
        StockableComponent
    ],
    declarations: [
        StockableDialogComponent,
        StockableComponent
    ],
    providers: [
        StockGraphQLService,
        StockableService
    ],
    entryComponents: [
        StockableDialogComponent
    ]
})
export class StockableModule
{
}
