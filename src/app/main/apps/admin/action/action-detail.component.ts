import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './action.graphql';

@Component({
    selector: 'dh2-admin-action-detail',
    templateUrl: './action-detail.component.html',
    animations: fuseAnimations
})
export class ActionDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.ACTION';
    objectTranslationGender = 'F';
    graphQL = graphQL;

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: ['', [Validators.required, Validators.minLength(2)]],
            name: ['', Validators.required]
        });
    }
}
