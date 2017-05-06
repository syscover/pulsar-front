import { Component, OnInit, Input } from '@angular/core';
import { Lang } from './../../../admin/admin.models';

@Component({
    selector: 'ps-lang-label',
    template: `
        <ng-container *ngIf="lang">
            <span class="flag-icon flag-icon-{{ lang.icon }}"></span> {{ lang.name }}
        </ng-container>
    `
})

export class LangLabelComponent implements OnInit {

    @Input() private lang: Lang;

    constructor() { }

    ngOnInit() { }
}
