import { Component, Input, forwardRef, Optional, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgModel, FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, NG_ASYNC_VALIDATORS} from '@angular/forms';

import { ElementBase } from './../element-base';

@Component({
    selector: 'ps-input',
    template: `
        <div class="{{ className }}">
            <span class="md-inputfield">
                <input  
                    [id]="identifier" 
                    type="{{ type }}" 
                    [(ngModel)]="value" 
                    pInputText
                    class="{invalid: (invalid | async)}">
                <label>{{ label }}</label>

                <div>
                    {{ invalid | async }}
                </div>
                <div *ngIf="invalid | async" class="ui-message ui-messages-error ui-corner-all">
                    This field is required
                </div>
            </span>
        </div>
    `,
    styles: [`
        :host{
            display: block; 
            width: 100%;
        }
        :host.ng-dirty.ng-invalid input {
            border-bottom-color: #e62a10; 
        }
    `],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }]
})
export class InputComponent extends ElementBase<string> {

    public identifier = `ps-input-${identifier++}`;

    @Input() public type: string = 'text';
    @Input() public label: string;
    @Input() public className: string;
    @Input() public placeholder: string;
    @Input() public value: string;

    @ViewChild(NgModel) model: NgModel;

    constructor(
        @Optional() @Inject(NG_VALIDATORS) validators: Array<any>,
        @Optional() @Inject(NG_ASYNC_VALIDATORS) asyncValidators: Array<any>
    ) {
        super(validators, asyncValidators);
    }
}

let identifier = 0;
