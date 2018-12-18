import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './action.graphql';

@Component({
    selector: 'dh2-forem-category-detail',
    templateUrl: 'action-detail.component.html',
    animations: fuseAnimations
})
export class ActionDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'FOREM.ACTION';
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
            name: ['', Validators.required],
            slug: ['', Validators.required]
        });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
