import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { graphQL } from './appellation.graphql';

@Component({
    selector: 'dh2-wine-appellation-detail',
    templateUrl: './appellation-detail.component.html',
    animations: fuseAnimations
})
export class AppellationDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'WINE.APPELLATION';
    objectTranslationGender = 'F';
    graphQL = graphQL;
    loadingSlug = false;

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: [{value: '', disabled: true}, Validators.required],
            lang_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            description: ''
        });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
