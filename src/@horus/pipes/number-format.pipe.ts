import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform
{
    transform(value: number, c: number = 2, d: string = ',', t: string = '.'): string | number
    {
        if (!value) return value;

        return value.toFixed(c).replace('.', d).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + t);
    }
}
