import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
    name: 'getLangValue'
})
export class GetLangValuePipe implements PipeTransform {
    transform(objects: any[], lang: string, field: string = null, langField: string = 'lang_id'): Object {

        // all config id are string
        const object = _.find(objects, [langField, lang]);

        if (field) return object[field];
        return object;
    }
}
