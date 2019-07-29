import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { Section } from '../cms.models';
import { graphQL } from './category.graphql';

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
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required],
            name: ['', Validators.required ],
            slug: ['', Validators.required ],
            section_id: '',
            sort: ''
        });
    }

    setRelationsData(data: any): void
    {
        // cms sections
        this.sections = data.cmsSections;
    }
}
