import { Pipe, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform
{
    constructor(
        private decimalPipe: DecimalPipe
    ) {}

    transform(
        value: number,
        decimalFormat: string = '1.2-2',
        suffix: string = '',
        prefix: string = ' €',
        decimalDelimiter: string = ',',
        milesDelimiter: string = '.'
    ): string
    {
        if (value)
        {
            const decimalValue = this.decimalPipe.transform(value, decimalFormat);
            const x = decimalValue.split('.');

            // get int number
            const x1 = x[0];
            // get decimal number
            const x2 = x.length > 1 ? decimalDelimiter + x[1] : '';

            return suffix + x1.replace(',', milesDelimiter) + x2 + prefix;
        }
    }
}
