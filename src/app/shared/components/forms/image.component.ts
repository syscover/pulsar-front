import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ps-image',
    template: `
        <img #image [src]="src">
    `,
    providers: [
        {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => ImageComponent),
        multi: true
        }
    ]
})

export class ImageComponent implements ControlValueAccessor, OnInit {

    @Input('src') public src;

    propagateChange = (_: any) => {};

    constructor() { }

    writeValue(value: string) {
        if (value !== undefined) {
            this.src = value;
        }
    }

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    registerOnTouched() {}

    ngOnInit() { }
}
