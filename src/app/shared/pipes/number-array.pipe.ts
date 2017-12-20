import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberArray'
})
export class NumberArrayPipe implements PipeTransform {

    transform(value, args: string[]): any {
        let res = [];
        for (let i = 0; i < value; i++) {
            res.push(i + 1);
        }
        return res;
    }
}
