import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CategoryGraphQLService } from './category-graphql.service';

@Component({
    selector: 'dh2-category-detail',
    templateUrl: './category-detail.component.html',
    animations: fuseAnimations
})
export class CategoryDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.CATEGORY';
    objectTranslationGender = 'F';

    constructor(
        protected injector: Injector,
        public graphQL: CategoryGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            ix: null,
            id: [{value: null, disabled: true}, Validators.required],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            slug: [null, Validators.required],
            active: false,
            description: null
        });
    }
}
