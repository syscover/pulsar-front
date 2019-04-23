import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'call'
})
export class CallPipe implements PipeTransform
{
    transform(fn: any): any
    {
        return fn();
    }
}
