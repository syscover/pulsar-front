import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { CategoryService } from './category.service';
import { Category } from '../market.models';

@Component({
    selector: 'ps-category-detail',
    templateUrl: './category-detail.component.html'
})
export class CategoryDetailComponent extends CoreDetailComponent implements OnInit {

    constructor(
        protected injector: Injector,
        protected objectService: CategoryService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        super.getRecordHasIdParamenter();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, Validators.required ],
            lang_id: ['', Validators.required],
            name: ['', Validators.required ],
            slug: ['', Validators.required ],
            active: '',
            description: ''
        });
    }
}
