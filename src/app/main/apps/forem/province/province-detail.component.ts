import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { graphQL } from './province.graphql';

@Component({
    selector: 'dh2-forem-province-detail',
    templateUrl: 'province-detail.component.html',
    animations: fuseAnimations
})
export class ProvinceDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'APPS.PROVINCE';
    objectTranslationGender = 'F';
    loadingSlug = false;

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
            name: ['', Validators.required]
        });
    }
}
