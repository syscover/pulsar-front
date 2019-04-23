import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { InputComponent } from '@horus/components/forms/input/input.component';

@NgModule({
    declarations: [
        InputComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule
    ],
    exports: [
        InputComponent
    ]
})
export class InputModule {}
