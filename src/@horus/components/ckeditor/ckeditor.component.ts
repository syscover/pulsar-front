import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CKEditorService } from '@horus/components/ckeditor/ckeditor.service';
import ClassicEditor from '@horus/components/ckeditor/build/ckeditor';


@Component({
    selector: 'hr-ckeditor',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CKEditorComponent),
            multi: true
        }
    ],
    template: `
        <ckeditor   [editor]="editorInstance" 
                    (ready)="handleOnReady($event)" 
                    [(ngModel)]="value"
                    [config]="{ 
                        placeholder: placeholder, 
                        toolbar: cKEditorService.toolbar,
                        extraPlugins: cKEditorService.extraPlugins
                    }"></ckeditor>
    `,
    styles: [` 
    `]
})
export class CKEditorComponent implements OnInit 
{
    editorInstance = ClassicEditor;
    @Input() placeholder: string;
    @Input() debug = false;
    @Input()
    get value(): string 
    {
        return this._value;
    }
    set value(value: string) 
    {
        if (this.debug) console.log('DEBUG - hr-ckeditor set value: ' + value);

        this._value = value;
        this.propagateChange(this._value);
    }
    private _value: string;

    // property for ControlValueAccessor
    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = (_: any) => { };
    
    constructor(
        public cKEditorService: CKEditorService
    ) { }

    ngOnInit(): void 
    {}

    handleOnReady($event)
    {
        console.log($event);
    }

    // method for ControlValueAccessor
    writeValue(value: string): void 
    {
        this.value = value;
    }

    // method for ControlValueAccessor
    registerOnChange(fn): void 
    {
        this.propagateChange = fn;
    }

    // method for ControlValueAccessor
    registerOnTouched(fn): void 
    {
        this.propagateTouch = fn;
    }
}
