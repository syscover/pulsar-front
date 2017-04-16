import { FormGroup, AbstractControl } from '@angular/forms';
import { ReflectiveInjector } from '@angular/core';

import { ValidationMessageService } from './../../core/services/validation-message.service';

import * as _ from 'lodash';

export const onSubmitFormGroup = (formGroup: FormGroup, data?: any): Object => {

    if (! formGroup) { return; }
    let formErrors = {};
    let fields = _.keysIn(formGroup.controls);

    // set validator service message to get message
    const injector = ReflectiveInjector.resolveAndCreate([
                ValidationMessageService
            ]);
    const validationMessageService = injector.get(ValidationMessageService);

    for (let field of fields){
        const formControl = formGroup.get(field);

        if (formControl && ! formControl.valid) {
            for (const error in formControl.errors) {
                formErrors[field] = validationMessageService.getMessage(error, formControl);
            }
        }
    }

    return formErrors;
};

export const onValueChangedFormControl =
    (formControl: AbstractControl, data?: any): string => {

    if (! formControl) { return; }
    let formError = undefined;

    // set validator service message to get message
    const injector = ReflectiveInjector.resolveAndCreate([
                ValidationMessageService
            ]);
    const validationMessageService = injector.get(ValidationMessageService);

    if (formControl && formControl.dirty && ! formControl.valid) {
        for (const error in formControl.errors) {
            formError = validationMessageService.getMessage(error, formControl);
        }
    }

    return formError;
};
