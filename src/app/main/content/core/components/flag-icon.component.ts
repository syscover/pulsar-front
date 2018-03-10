import { Component, Input } from '@angular/core';
import { Lang } from './../../apps/admin/admin.models';

@Component({
    selector: 'dh2-flag-icon',
    styles: [`
        :host {
             display: flex;
             align-items: center;
             margin-bottom: 20px;
             height: 45.5px
        }
        .flag-icon {
            margin-right: 10px;
        }
    `],
    template: `
        <ng-container *ngIf="lang">
            <span class="flag-icon flag-icon-{{ lang.icon }}" [ngStyle]="{'width': width, 'height': 'calc(' + width + ' / 1.33)'}"></span> {{ lang.name }}
        </ng-container>
    `
})

export class FlagIconComponent
{
    @Input() lang: Lang;
    @Input() width: string;
}
