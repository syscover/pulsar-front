import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'getSelectValues'
})
export class GetSelectValuesPipe implements PipeTransform 
{
    transform(values: any[], lang: string): any[] 
    {
        const val = _.filter(values, obj => {
            return (obj.lang_id === lang);
        });

        return _.sortBy(val, 'sort');
    }
}
