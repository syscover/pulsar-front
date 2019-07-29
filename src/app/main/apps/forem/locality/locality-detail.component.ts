import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { Province } from '../forem.models';
import { graphQL } from './locality.graphql';

@Component({
    selector: 'dh2-forem-locality-detail',
    templateUrl: 'locality-detail.component.html',
    animations: fuseAnimations
})
export class LocalityDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'APPS.PROVINCE';
    objectTranslationGender = 'F';
    public provinces: Province[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            code: ['', Validators.required],
            name: ['', Validators.required],
            province_id: ['', Validators.required],
        });
    }

    setRelationsData(data: any): void
    {
        // provinces
        this.provinces = data.foremProvinces;
    }
}
