import { AbstractControl, ValidatorFn } from '@angular/forms';

export function notEqual(matchField: string, fieldName: string, matchFieldName: string): ValidatorFn 
{
    return (control: AbstractControl): {[key: string]: any} => 
    {
        const controlToCompare = control.parent.get(matchField);

        if (controlToCompare && control.value !== controlToCompare.value)
        {
            return {
                notequal: {
                    fieldName,
                    matchFieldName
                }
            }; 
        }  
        return null;
    };
}
