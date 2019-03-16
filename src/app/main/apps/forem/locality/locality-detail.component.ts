import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
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
