import { Pipe, PipeTransform } from '@angular/core';
import { Translated } from './../shared.models';

import { Lang } from './../../admin/admin.models';

@Pipe({
  name: 'checkLangsObject'
})
export class CheckLangsObjectPipe implements PipeTransform {

  transform(object: Translated, activatedLangs: Lang[], completedClass: string = 'green', uncompletedClass: string = 'red'): string {

    const langs: string[] = JSON.parse(object.data_lang).langs; // get langs from object

    for (const lang of activatedLangs) {
        if (langs.indexOf(lang.id) === -1) {
            return uncompletedClass;
        }
    }
    return completedClass;
  }

}
