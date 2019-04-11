import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Pipe({
    name: 'mustTranslate'
})
export class MustTranslatePipe implements PipeTransform
{
    transform(action: string, showSpinner: boolean, objects: any[], fg: FormGroup, formControlName: string): boolean
    {
        return action === 'create-lang' && ! showSpinner && ! _.find(objects, {'id': fg.get(formControlName).value});
    }
}
