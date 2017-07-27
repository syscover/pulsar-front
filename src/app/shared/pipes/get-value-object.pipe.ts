import { Pipe, PipeTransform } from '@angular/core';
import { Translated } from './../classes/translated';
import * as _ from 'lodash';

@Pipe({
    name: 'getValueObject'
})
export class GetValueObjectPipe implements PipeTransform {
    transform(objects: any[], id: string, value: any, field: string): string {

        // all config id are string
        const object = _.find(objects, [id, value.toString()]);

        return object[field];
    }
}
