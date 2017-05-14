import { Pipe, PipeTransform } from '@angular/core';
import { Translated } from './../classes/translated';

import { Lang } from './../../admin/admin.models';

@Pipe({
  name: 'checkLangsObject'
})
export class CheckLangsObjectPipe implements PipeTransform {

  transform(object: Translated, activatedLangs: Lang[], completedClass: string = 'green', uncompletedClass: string = 'red'): string {

    const langs: string[] = object.data_lang; // get langs from object

    for (const lang of activatedLangs) {
        if (langs.indexOf(lang.id) === -1) {
            return uncompletedClass;
        }
    }
    return completedClass;
  }

}
