import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material';
import { SpinnerComponent } from '@horus/components/spinner/spinner.component';

@NgModule({
    imports: [
        CommonModule,
        MatProgressSpinnerModule
    ],
    exports: [
        SpinnerComponent,
    ],
    declarations: [
        SpinnerComponent
    ],
    providers: [],
})
export class SpinnerModule {}
