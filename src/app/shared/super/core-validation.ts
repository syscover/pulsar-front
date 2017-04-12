import { FormGroup, AbstractControl } from '@angular/forms';

import { ValidationMessageService } from './../../core/services/validation-message.service';

import * as _ from 'lodash';

export const onValueChangedFormGroup = (formGroup: FormGroup, data?: any, validationMessageService?: ValidationMessageService): Object => {

    if (! formGroup) { return; }
    let formErrors = {};
    let fields = _.keysIn(formGroup.controls);

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
    (formControl: AbstractControl, data?: any, validationMessageService?: ValidationMessageService): string => {

    if (! formControl) { return; }
    let formError = undefined;

    if (formControl && formControl.dirty && ! formControl.valid) {
        for (const error in formControl.errors) {
            formError = validationMessageService.getMessage(error, formControl);
        }
    }

    return formError;
};



