import { FormGroup, AbstractControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';

export interface ChipsDecoratorInterface
{
    addTag: Function;
    removeTag: Function;
}

export function Chips(): Function
{
    return function(target: Function): void
    {
        target.prototype.addTag = function (formGroup: FormGroup, name: string, event: MatChipInputEvent): void
        {
            const input = event.input;
            const value = event.value;
            const formControl: AbstractControl = formGroup.controls[name];

            // Add tag
            if ( value )
            {
                const tags = Object.assign([], formControl.value);
                tags.push(value);
                formControl.setValue(tags);

                // set status form
                formControl.markAsDirty();
            }
            formControl.markAsTouched();

            // Reset the input value
            if ( input ) input.value = '';
        };

        target.prototype.removeTag = function (formGroup: FormGroup, name: string, tag): void
        {
            const formControl: AbstractControl = formGroup.controls[name];
            const tags = Object.assign([], formControl.value);
            const index = tags.indexOf(tag);

            if ( index >= 0 )
            {
                tags.splice(index, 1);

                // set status form
                formControl.markAsDirty();
            }
            formControl.markAsTouched();

            formControl.setValue(tags);
        };
    };
}


