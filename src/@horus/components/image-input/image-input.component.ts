import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'dh2-image-input',
    template: `
        <img #image [src]="imgSrc" [class]="styleClass" [style]="style">
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ImageInputComponent),
            multi: true
        }
    ]
})
export class ImageInputComponent implements ControlValueAccessor {

    private _src: string;
    @Input('src') imgSrc;
    @Input('styleClass') styleClass;
    @Input('style') style;

    get src(): string
    {
        return this._src;
    }

    writeValue(value: string): void {
        if (value !== undefined) {
            this._src = value;
            this.refresh();
        }
    }

    registerOnChange(fn): void { }

    registerOnTouched(fn): void { }

    refresh(): void {
        this.imgSrc = this._src + '?' + Math.random();
    }
}
