import { ReflectiveInjector } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';
import { ValidationMessageService } from './../services/validation-message.service';
import * as _ from 'lodash';

/**
 * Set errors when submit form.
 * This function set formErrors in core-detail.component.ts, this variable
 * is binding in all inputs of formGroup.
 * Each formControl search itself your error inside formErrors
 *
 * @param formGroup
 * @param data
 */
export const setErrorsOnSubmitFormGroup = (formGroup: FormGroup, data?: any): Object => {
    if (! formGroup) { return; }
    const formErrors = {};
    const fields = _.keysIn(formGroup.controls); // get fields array

    // set validator service message to get message
    const validationMessageService = ReflectiveInjector.resolveAndCreate([
                ValidationMessageService
            ]).get(ValidationMessageService);

    for (const field of fields)
    {
        const formControl = formGroup.get(field);
        if (formControl && formControl.invalid)
        {
            for (const error in formControl.errors)
            {
                if (formControl.errors[error]) formErrors[field] = validationMessageService.getMessage(error, formControl);
            }
        }
    }
    return formErrors;
};

/**
 * When change formControl, check if has any error, whith first error finded,
 * set error string in component input, this variable is binding in template to show or not 
 * message error
 *
 * @param formControl
 * @param data
 */
export const onValueChangedFormControl =
    (formControl: AbstractControl, data?: any): string => {
    if (! formControl) { return; }
    let formError;

    // set validator service message to get message
    const injector = ReflectiveInjector.resolveAndCreate([
                ValidationMessageService
            ]);
    const validationMessageService = injector.get(ValidationMessageService);

    if (formControl && formControl.dirty && ! formControl.valid)
    {
        for (const error in formControl.errors)
        {
            if (formControl.errors[error]) formError = validationMessageService.getMessage(error, formControl);
        }
    }
    return formError;
};
