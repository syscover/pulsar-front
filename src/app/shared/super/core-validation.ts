import { FormGroup } from '@angular/forms';

import { ValidationMessageService } from './../../core/services/validation-message.service';

import * as _ from 'lodash';

export const onValueChanged = (fg: FormGroup, data?: any, validationMessageService?: ValidationMessageService): Object => {

    if (! fg) { return; }
    let formErrors = {};
    let fields = _.keysIn(fg.controls);

    for (let field of fields){
        const formControl = fg.get(field);

        if (formControl && formControl.dirty && ! formControl.valid) {
            for (const error in formControl.errors) {
                formErrors[field] = validationMessageService.getMessage(error, formControl);
            }
        }
    }

    return formErrors;
};



