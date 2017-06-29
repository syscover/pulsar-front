import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CategoryGraphQLService } from './category-graphql.service';

@Component({
    selector: 'ps-category-detail',
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: CategoryGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            lang_id: ['', Validators.required],
            name: ['', Validators.required ],
            slug: ['', Validators.required ],
            sort: null
        });
    }
}
