import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { graphQL } from './type.graphql';

@Component({
    selector: 'dh2-innova-concrete-type-detail',
    templateUrl: 'type-detail.component.html',
    animations: fuseAnimations
})
export class TypeDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'APPS.TYPE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required]
        });
    }
}
