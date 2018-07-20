import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { merge } from 'rxjs/observable/merge';
import { TranslateService } from '@ngx-translate/core';
import 'rxjs/add/operator/map';
import * as _ from 'lodash';

@Injectable()
export class ValidationMessageService
{
    private translations: any;

    constructor(
        private translateService: TranslateService
    ) 
    {
        this.translateService.onLangChange.subscribe((e: Event) => {
            this.getAndInitTranslations();
        });

        this.getAndInitTranslations();
    }

    getAndInitTranslations()
    {
        // load translations for component
        this.translateService
            .get(['VALIDATIONS'])
            .map(translations => {
                if (translations['VALIDATIONS'])
                {
                    for (const index in translations['VALIDATIONS'])
                    {
                        if (index) translations['VALIDATIONS.' + index] = translations['VALIDATIONS'][index];
                    }
                    delete translations.APPS;
                    return translations;
                }
            })
            .subscribe(response => {
                this.translations = response;
            });
    }

    getMessage(error: string, formControl?: AbstractControl): string 
    {
        switch (error) 
        {
            case 'required':
                return this.translations['VALIDATIONS.REQUIRED'];

            case 'minlength':
                return this.translateService.instant('VALIDATIONS.MINLENGTH', {'minlength': formControl.errors[error]['requiredLength']});

            case 'maxlength':
                return this.translateService.instant('VALIDATIONS.MAXLENGTH', {'maxlength': formControl.errors[error]['requiredLength']});

            case 'email':
                return this.translations['VALIDATIONS.EMAIL'];

            case 'notequal':
                return this.translateService.instant('VALIDATIONS.NOT_EQUAL', {'fieldname': formControl.errors[error]['fieldName'], 'matchfieldname': formControl.errors[error]['matchFieldName']});

            default:
                return this.translations['VALIDATIONS.DEFAULT'];
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

    // add controls to validate and get message error
    addControl(name: string, formControl: FormControl, formErrors: any) 
    {
        merge(
            formControl.valueChanges,
            formControl.statusChanges
        ).subscribe(
            data => {
                formErrors[name] = this.onChange(formControl);
            }
        );  
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
