import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-button',
    template: `
        <button pButton 
            [type]="type" 
            [icon]="icon" 
            [label]="label"
            [class]="className"></button>
    `,
    styles: [`
        :host{
            appearance: none !important;
            -moz-appearance: none !important;
            -webkit-appearance: none !important;
        }
        `]
})
export class ButtonComponent implements OnInit {

    @Input() private type: string;
    @Input() private label: string;
    @Input() private icon: string;
    @Input() private className: string;

    constructor( ) { }

    ngOnInit() { }

}
