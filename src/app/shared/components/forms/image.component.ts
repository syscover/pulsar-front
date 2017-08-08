import { Component, Input, forwardRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'ps-image',
    template: `
        <img #image [src]="imgSrc" [class]="styleClass" [style]="style">
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageComponent),
            multi: true
        }
    ]
})

export class ImageComponent implements ControlValueAccessor {

    private _src: string;
    @Input('src') imgSrc;
    @Input('styleClass') styleClass;
    @Input('style') style;

    writeValue(value: string) {
        if (value !== undefined) {
            this._src = value;
            this.refresh();
        }
    }
    registerOnChange(fn) { }
    registerOnTouched(fn) { }

    refresh() {
        this.imgSrc = this._src + '?' + Math.random();
    }

    get src(): string {
        return this._src;
    }
}
