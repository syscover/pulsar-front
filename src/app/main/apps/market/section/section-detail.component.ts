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
        public graphQL: SectionGraphQLService
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
            lang_id: [null, Validators.required],
            name: [null, Validators.required ],
            slug: [null, Validators.required ]
        });
    }

    disabledForm(): void
    {
        this.fg.controls['id'].disable();
    }

    afterSetData(): void
    {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang')
        {
            if (this.dataRoute.action === 'create-lang')
            {
                // disabled inputs that hasn't containt multi language
                this.disabledForm();
            }
            else if (this.dataRoute.action === 'edit')
            {
                // disabled elements if edit diferent language that base lang
                if (this.lang.id !== this.baseLang) this.disabledForm();
            }
        }
    }
}
