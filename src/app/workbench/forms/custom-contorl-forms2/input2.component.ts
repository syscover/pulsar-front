import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ps-input2',
    template: `
        <div class="clo-6">
            <span class="md-inputfield">
                <input  type="text" 
                        [value]="value" 
                        pInputText>
                <label>{{ label }}</label>
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
      useExisting: forwardRef(() => Input2Component),
      multi: true
    }]
})
export class Input2Component {

    @Input() label = 'switch';
    @Input('value') _value = false;
    onChange: any = () => { };
    onTouched: any = () => { };

    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
        this.onChange(val);
        this.onTouched();
    }

    constructor() { }

    registerOnChange(fn) {
        this.onChange = fn;
    }

    writeValue(value) {
        if (value) {
            this.value = value;
        }
  }

    registerOnTouched(fn) {
        this.onTouched = fn;
    }
}
