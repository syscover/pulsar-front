import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { graphQL } from './award.graphql';

@Component({
    selector: 'dh2-wine-award-detail',
    templateUrl: './award-detail.component.html',
    animations: fuseAnimations
})
export class AwardDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'WINE.AWARD';
    objectTranslationGender = 'M';
    graphQL = graphQL;
    loadingSlug = false;

    constructor(
        protected _injector: Injector
    )
    {
        super(_injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: [{value: '', disabled: true}, Validators.required],
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required]
        });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
