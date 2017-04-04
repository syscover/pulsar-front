import { Pipe, PipeTransform } from '@angular/core';
import { Translated } from './../shared.models';

import { Lang } from './../../admin/admin.models';

@Pipe({
  name: 'actionLangObject'
})
export class ActionLangObjectPipe implements PipeTransform {

    transform(object: Translated, lang: Lang): string {

        const langs: string[] = JSON.parse(object.data_lang).langs; // get langs from object

        if (langs.indexOf(lang.id) === -1) {
            return 'create';
        }
        return 'edit';
    }
}
