import { Section } from './../cms.models';
import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CategoryGraphQLService } from './category-graphql.service';
import * as _ from 'lodash';

@Component({
    selector: 'ps-category-detail',
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent extends CoreDetailComponent {

    sections: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: CategoryGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: '',
            object_id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required],
            name: ['', Validators.required ],
            slug: ['', Validators.required ],
            section_id: '',
            sort: null
        });
    }

    setRelationsData(data) {
        // cms sections
        this.sections = _.map(<Section[]>data['cmsSections'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.sections.unshift({ label: 'Select a section', value: '' });
    }
}
