import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { LangService } from './lang.service';
import { Lang } from '../admin.models';

@Component({
    selector: 'ps-lang-detail',
    templateUrl: 'lang-detail.component.html'
})
export class LangDetailComponent extends CoreDetailComponent implements OnInit {

    private baseUri = '/pulsar/admin/langs';
    private formDetail: FormGroup;
    private object: Lang = new Lang(); // set empty object
    private f: Function = (data = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = data; // function to set custom data
        }
        // with other action
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private objectService: LangService,
    ) {
        super(
            router,
            route,
            objectService
        );
        this.createForm(); // create form
    }

    ngOnInit() {
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.formDetail = this.fb.group({
            id: ['', Validators.required ],
            name: '',
            icon: '',
            sort: '',
            base: '',
            active: ''
        });
    }

}
