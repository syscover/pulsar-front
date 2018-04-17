import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CategoryGraphQLService } from './category-graphql.service';
import { Section } from './../cms.models';

@Component({
    selector: 'dh2-category-detail',
    templateUrl: './category-detail.component.html',
    animations: fuseAnimations
})
export class CategoryDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'CMS.CATEGORY';
    objectTranslationGender = 'F';
    sections: Section[] = [];

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
            id: [{value: null, disabled: true}],
            lang_id: [null, Validators.required],
            name: [null, Validators.required ],
            slug: [null, Validators.required ],
            section_id: null,
            sort: null
        });
    }

    setRelationsData(data: any) 
    {
        // cms sections
        this.sections = data.cmsSections;
    }
}
