import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable()
export class ValidationMessageService {

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
}
