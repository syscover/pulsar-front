import { Pipe, PipeTransform } from '@angular/core';
import { Translatable } from '@horus/types';
import { Lang } from '@horus/types';

@Pipe({
  name: 'checkTranslationObject'
})
export class CheckTranslationObjectPipe implements PipeTransform 
{
    transform(object: Translatable, activatedLangs: Lang[], completedClass: string = 'completed-translations', uncompletedClass: string = 'uncompleted-translations'): string 
    {
        const langs: number[] = object.data_lang; // get langs from object
        for (const lang of activatedLangs) 
        {
            if (langs.indexOf(lang.id) === -1) return uncompletedClass;
        }
        return completedClass;
    }
}
