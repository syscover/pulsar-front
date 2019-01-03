import { Component, Input } from '@angular/core';
import { Lang } from '../../../apps/admin/admin.models';

@Component({
    selector: 'dh2-flag-icon',
    styles: [`
        :host {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
        }
        .flag-icon {
            margin-right: 10px;
        }
        .rounded {
            border-radius: 50% !important;
        }
    `],
    template: `
        <ng-container *ngIf="lang">
            <span class="flag-icon flag-icon-{{ lang.icon }}"
                  [ngClass]="{'rounded': rounded}"
                  [ngStyle]="{'flag-icon-squared': squared, 'rounded': rounded, 'font-size': size}"></span> {{ lang.name }}
        </ng-container>
    `
})

export class FlagIconComponent
{
    @Input() squared = false;
    @Input() rounded = false;
    @Input() lang: Lang;
    @Input() size: string;
}
