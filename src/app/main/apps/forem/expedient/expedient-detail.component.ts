import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/foundations/core-detail-compoment';
import { graphQL } from './expedient.graphql';
import { Modality } from '../forem.models';

@Component({
    selector: 'dh2-forem-expedient-detail',
    templateUrl: 'expedient-detail.component.html',
    animations: fuseAnimations
})
export class ExpedientDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'FOREM.EXPEDIENT';
    objectTranslationGender = 'F';
    modalities: Modality[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            modality_id: ['', Validators.required],
            ambit: ['', Validators.required],
            year: ['', Validators.required],
            code: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
            name: ['', Validators.required],
            starts_at: '',
            ends_at: ''
        });
    }

    argumentsRelationsObject(): object
    {
        const configModalities = {
            key: 'pulsar-forem.modalities'
        };

        return {
            configModalities
        };
    }

    setRelationsData(data: any): void
    {
        // set modalities
        this.modalities = <Modality[]>data.foremModalities;
    }

    afterPatchValueEdit(): void
    {
        this.handleChangeModality({value: this.object.modality_id});
    }

    handleChangeModality($event): void
    {
        if ($event.value === 1)
        {
            this.fg.get('code').setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3)]);
        }
        else
        {
            this.fg.get('code').clearValidators();
            this.fg.get('code').setValue('');
        }
        this.fg.get('code').updateValueAndValidity();


        if ($event.value === 6)
        {
            this.fg.get('ambit').setValidators([Validators.required, Validators.minLength(2), Validators.maxLength(2)]);
        }
        else
        {
            this.fg.get('ambit').clearValidators();
            this.fg.get('ambit').setValue('');
        }
        this.fg.get('ambit').updateValueAndValidity();
    }
}
