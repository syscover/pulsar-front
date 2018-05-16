import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'valuesArray'
})
export class ValuesArrayPipe implements PipeTransform
{
    transform(objects: any[], key: string, separator: string, prefix: string, suffix: string): string 
    {
        const response = _.map(objects, (item) => {
            let value = item[key];
            
            value = prefix ? prefix + value : value;
            value = suffix ? value + suffix : value;
                        
            return value;
        });

        return response.join(separator);        
    }
}
