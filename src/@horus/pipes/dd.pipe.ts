import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dd'
})
export class DdPipe implements PipeTransform
{
    transform(value: any): any
    {
        console.log(value);

        return value;
    }
}
