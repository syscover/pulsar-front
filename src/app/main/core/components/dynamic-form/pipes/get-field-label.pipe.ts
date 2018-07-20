import { Pipe, PipeTransform } from '@angular/core';
import { Field, Lang } from './../../../../apps/admin/admin.models';

@Pipe({
  name: 'getFieldLabel'
})
export class GetFieldLabelPipe implements PipeTransform 
{
    transform(field: Field, lang: Lang): string 
    {
        const labelObj = field.labels.find((el) => {
            return el['id'] === lang;
        });

        // check if label exist for this lang
        return labelObj ? labelObj['value'] : null;
    }
}
