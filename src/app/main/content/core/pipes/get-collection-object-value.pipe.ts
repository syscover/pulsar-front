import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'getCollectionObjectValue'
})
export class GetCollectionObjectValuePipe implements PipeTransform 
{
    transform(objects: any[], id: string, idValue: any, field: string): string 
    {
        // all config id are string
        const object = _.find(objects, [id, idValue.toString()]);
        return object[field];
    }
}
