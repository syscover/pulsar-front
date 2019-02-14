import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { MatBadgeModule, MatButtonModule, MatIconModule } from '@angular/material';
import { UpdateService } from './update.service';

@NgModule({
    declarations: [
        UpdateComponent
    ],
    imports: [
        CommonModule,
        MatBadgeModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        UpdateComponent
    ],
    providers: [
        UpdateService
    ],
})
export class UpdateModule
{ }
