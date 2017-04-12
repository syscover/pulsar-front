import { JsonResponse } from './../../shared/classes/json-respose';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { Country } from '../admin.models';
import { CountryService } from './country.service';
import { Lang } from './../admin.models';
import { LangService } from './../langs/lang.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-country-detail',
    templateUrl: './country-detail.component.html'
})
export class CountryDetailComponent extends CoreDetailComponent implements OnInit {

    private langs: SelectItem[] = [];

    private formDetail: FormGroup;
    private object: Country = new Country(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data

            // set new lang
            if (this.dataRoute.action === 'create-lang') {
                this.formDetail.patchValue({
                    lang_id: this.params['newLang']
                });
            } else {
                this.formDetail.patchValue({
                    lang_id: this.params['lang']
                });
            }
        }
    }

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
        this.langService.getRecords()
            .subscribe((response) => {

            this.langs = _.map(<Lang[]>response.data, obj => {
                return { label: obj.name, value: obj.id };
            }); // get langs

            this.langs.unshift({ label: 'Select a language', value: 0 });
            super.getRecordHasIdParamenter(this.f);
        });
    }

    createForm() {

        this.formDetail = this.fb.group({
            id: ['', Validators.required ],
            name: '',
            lang_id: {value: '', disabled: this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang'},
            prefix: '',
            sort: '',
            territorial_area_1: '',
            territorial_area_2: '',
            territorial_area_3: ''
        });
    }

}
