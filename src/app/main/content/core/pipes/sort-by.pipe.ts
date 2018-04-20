import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'sortBy'
})
export class SortByPipe implements PipeTransform 
{
    transform(collection: any[], pattern: any[]): string 
    {
        return _.sortBy(collection, pattern);
    }
}
