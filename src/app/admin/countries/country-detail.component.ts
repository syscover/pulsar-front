import { Lang } from './../admin.models';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { Country } from '../admin.models';
import { CountryService } from './country.service';
import { LangService } from './../langs/lang.service';

@Component({
    selector: 'ps-country-detail',
    templateUrl: './country-detail.component.html'
})
export class CountryDetailComponent extends CoreDetailComponent implements OnInit {

    private formDetail: FormGroup;
    private object: Country = new Country(); // set empty object
    private f: Function = data => this.object = data; // function to set custom data

    private langs: Lang[] = [];

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private objectService: CountryService,
        private langService: LangService
    ) {
        super(
            router,
            route,
            objectService
        );
        this.createForm(); // create form
    }

    ngOnInit() {
        this.langService.getRecords().subscribe(data => this.langs = data);
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.formDetail = this.fb.group({
            id: ['', Validators.required ],
            name: '',
            lang_id: ''
        });
    }

    onSubmit() {
        super.onSubmit(this.formDetail, this.object, this.objectService.baseUri);
    }

}
