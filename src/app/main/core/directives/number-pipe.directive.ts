import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MatFormFieldControl } from '@angular/material';
import './../functions/number-decimals-length.function';

@Directive({
    selector: '[dh2NumberPipe]',
    providers: [DecimalPipe]
})
export class NumberPipeDirective implements OnInit
{
    @Input('dh2NumberPipe') expression: string;
    @Input('maxDecimals') maxDecimals = 2;

    constructor(
        private matForm: MatFormFieldControl<any>,
        private decimalPipe: DecimalPipe
    ) { }

    ngOnInit(): void
    {
        this.matForm.stateChanges.subscribe(() => {

            // get value with casting to number
            const value = +this.matForm.value;

            if (value.decimalsLength() > this.maxDecimals)
            {
                this.matForm.value = this.decimalPipe.transform(value, this.expression);
            }
        });
    }
}
