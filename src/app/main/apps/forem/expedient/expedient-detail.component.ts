import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './expedient.graphql';

@Component({
    selector: 'dh2-forem-expedient-detail',
    templateUrl: 'expedient-detail.component.html',
    animations: fuseAnimations
})
export class ExpedientDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'FOREM.EXPEDIENT';
    objectTranslationGender = 'F';

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
            year: ['', Validators.required],
            starts_at: '',
            ends_at: ''
        });
    }
}
