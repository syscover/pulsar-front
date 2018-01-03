import { style } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { Lang } from './../../../modules/admin/admin.models';

@Component({
    selector: 'ps-lang-label',
    styles: [`
        :host{
            margin-bottom: 40px;
        }
    `],
    template: `
        <ng-container *ngIf="lang">
            <span class="flag-icon flag-icon-{{ lang.icon }}"></span> {{ lang.name }}
        </ng-container>
    `
})

export class LangLabelComponent implements OnInit {

    @Input() lang: Lang;

    constructor() { }

    ngOnInit() { }
}
