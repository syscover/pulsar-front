import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { Province } from '../forem.models';
import { graphQL } from './trainer.graphql';

@Component({
    selector: 'dh2-forem-trainer-detail',
    templateUrl: 'trainer-detail.component.html',
    animations: fuseAnimations
})
export class TrainerDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'FOREM.TRAINER';
    objectTranslationGender = 'M';
    // public provinces: Province[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            profile_id: ['1', Validators.required],
            name: ['', Validators.required]
        });
    }

    setRelationsData(data: any): void
    {
        // provinces
        // this.provinces = data.foremProvinces;
    }
}
