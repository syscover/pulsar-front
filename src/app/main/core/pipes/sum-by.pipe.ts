import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'sumBy'
})
export class SumByPipe implements PipeTransform
{
    transform(collection: any[], property: string): number
    {
        return _.sumBy(collection, property);
    }
}
