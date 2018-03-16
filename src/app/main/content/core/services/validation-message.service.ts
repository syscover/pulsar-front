
import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { merge } from 'rxjs/observable/merge';
import * as _ from 'lodash';

@Injectable()
export class ValidationMessageService 
{
    getMessage(error: string, formControl?: AbstractControl): string {
        switch (error) {
            case 'required':
                return 'This field is required.';

            case 'minlength':
                return `This field must be at least ${formControl.errors[error]['requiredLength']} characters.`;

            case 'maxlength':
                return `This field may not be greater than ${formControl.errors[error]['requiredLength']} characters.`;

            case 'email':
                return 'This field must be a valid email address.';

            default:
                return 'Error not contemplated';
        }
    }

    setErrors(formGroup: FormGroup, data?: any): Object {

        if (! formGroup) { return; }
        const formErrors = {};
        const fields = _.keysIn(formGroup.controls); // get fields array, form control is a object
    
        for (const field of fields)
        {
            const formControl = formGroup.get(field);
            if (formControl && formControl.invalid)
            {
                for (const error in formControl.errors)
                {
                    if (formControl.errors[error]) formErrors[field] = this.getMessage(error, formControl);
                }
            }
        }
        return formErrors;
    }

    subscribeForm(formGroup: FormGroup, formErrors: any) 
    {
        for (const field of _.keysIn(formGroup.controls))
        {
            merge(
                formGroup.get(field).valueChanges,
                formGroup.get(field).statusChanges
            ).subscribe(
                data => {
                    formErrors[field] = this.onChange(formGroup.get(field));
                }
            );    
        }
    }

    onChange(formControl: AbstractControl): string 
    {
        if (! formControl) { return; }
        let formError;
        
        if (formControl && formControl.dirty && formControl.invalid)
        {
            for (const error in formControl.errors)
            {
                if (formControl.errors[error]) formError = this.getMessage(error, formControl);
            }
        }
        return formError;
    }

}
