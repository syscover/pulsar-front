import { FormGroup, AbstractControl } from '@angular/forms';
import { ReflectiveInjector } from '@angular/core';

import { ValidationMessageService } from './../../core/services/validation-message.service';

import * as _ from 'lodash';

export const onValueChangedFormGroup = (formGroup: FormGroup, validationMessageService: ValidationMessageService, data?: any): Object => {

    if (! formGroup) { return; }
    let formErrors = {};
    let fields = _.keysIn(formGroup.controls);

    const injector = ReflectiveInjector.resolveAndCreate([
            ValidationMessageService
        ]);
    validationMessageService = injector.get(ValidationMessageService);

    for (let field of fields){
        const formControl = formGroup.get(field);

        if (formControl && formControl.dirty && ! formControl.valid) {
            for (const error in formControl.errors) {
                formErrors[field] = validationMessageService.getMessage(error, formControl);
            }
        }
    }

    return formErrors;
};

export const onValueChangedFormControl =
    (formControl: AbstractControl, validationMessageService?: ValidationMessageService, data?: any): string => {

    if (! formControl) { return; }
    let formError = undefined;

    if (formControl && formControl.dirty && ! formControl.valid) {
        for (const error in formControl.errors) {
            formError = validationMessageService.getMessage(error, formControl);
        }
    }

    return formError;
};
