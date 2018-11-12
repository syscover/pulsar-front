import { Component, Input } from '@angular/core';
import { fuseAnimations } from '../../../../../@fuse/animations';

@Component({
    selector: 'dh2-spinner',
    animations: fuseAnimations,
    template: `
        <div *ngIf="show" class="layer">
            <mat-spinner></mat-spinner>
        </div>
    `,
    styles: [`
        .layer {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            background: rgba(0, 0, 0, 0.15);
            z-index: 99999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `]
})

export class SpinnerComponent
{
    @Input() show = true;
}
