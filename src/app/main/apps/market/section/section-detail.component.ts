import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { SectionGraphQLService } from './section-graphql.service';

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
        protected injector: Injector,
        protected graphQL: SectionGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: null,
            id: [null, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(30)]
            ],
            name: [null, Validators.required ]
        });
    }
}
