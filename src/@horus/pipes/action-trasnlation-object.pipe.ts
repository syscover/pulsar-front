import { Pipe, PipeTransform } from '@angular/core';
import { Translatable } from '../types/translatable';
import { Lang } from '@horus/types/lang';

@Pipe({
  name: 'actionTranslationObject'
})
export class ActionTranslationObjectPipe implements PipeTransform 
{
    transform(object: Translatable, lang: Lang): string 
    {
        const langs: number[] = object.data_lang; // get langs from object
        if (langs.indexOf(lang.id) === -1) return 'create';
        return 'edit';
    }
}
