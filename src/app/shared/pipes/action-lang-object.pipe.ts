import { Pipe, PipeTransform } from '@angular/core';
import { Translated } from './../classes/translated';
import { Lang } from './../../modules/admin/admin.models';

@Pipe({
  name: 'actionLangObject'
})
export class ActionLangObjectPipe implements PipeTransform {

    transform(object: Translated, lang: Lang): string {

        const langs: string[] = object.data_lang; // get langs from object

        if (langs.indexOf(lang.id) === -1) {
            return 'create';
        }
        return 'edit';
    }
}
