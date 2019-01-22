import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
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
            year: ['', Validators.required],
            code: '',
            name: ['', Validators.required],
            starts_at: '',
            ends_at: ''
        });
    }

    argumentsRelationsObject(): Object
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
}
