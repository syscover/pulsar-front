import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numbersArray'
})
export class NumbersArrayPipe implements PipeTransform 
{
    transform(value, args: string[]): any
    {
        const res = [];
        for (let i = 0; i < value; i++) 
        {
            res.push(i + 1);
        }
        return res;
    }
}
