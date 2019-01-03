import { Pipe, PipeTransform } from '@angular/core';
import { Translatable } from '../types/translatable';
import { Lang } from '../../apps/admin/admin.models';

@Pipe({
  name: 'checkTranslationObject'
})
export class CheckTranslationObjectPipe implements PipeTransform 
{
    transform(object: Translatable, activatedLangs: Lang[], completedClass: string = 'completed-translations', uncompletedClass: string = 'uncompleted-translations'): string 
    {
        const langs: string[] = object.data_lang; // get langs from object
        for (const lang of activatedLangs) 
        {
            if (langs.indexOf(lang.id) === -1) return uncompletedClass;
        }
        return completedClass;
    }
}
