import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { graphQL } from './section.graphql';

@Component({
    selector: 'dh2-market-section-detail',
    templateUrl: './section-detail.component.html',
    animations: fuseAnimations
})
export class SectionDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.SECTION';
    objectTranslationGender = 'F';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(30)]
            ],
            lang_id: ['', Validators.required],
            name: ['', Validators.required ],
            slug: ['', Validators.required ]
        });
    }

    disableForm(): void
    {
        this.fg.controls['id'].disable();
    }
}
