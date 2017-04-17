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

    // paramenters for parent class
    private object: Category = new Category(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.setValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: CategoryService
    ) {
        super(injector);
    }

    ngOnInit() {
        this.createForm(); // create form
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', Validators.required ],
            name: ['', Validators.required ]
        });
    }

}
