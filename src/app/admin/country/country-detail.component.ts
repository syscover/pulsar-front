import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/primeng';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { Country, Lang } from './../admin.models';
import { CountryService } from './country.service';

// custom imports
import { LangService } from './../lang/lang.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-country-detail',
    templateUrl: './country-detail.component.html'
})
export class CountryDetailComponent extends CoreDetailComponent implements OnInit {

    // paramenters for parent class
    private object: Country = new Country(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit' || this.dataRoute.action === 'create-lang') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form, if the object not match with form, use pachValue instead of setvelue

            // set new lang
            if (this.dataRoute.action === 'create-lang') {
                this.fg.patchValue({
                    lang_id: this.params['newLang']
                });
            } else {
                this.fg.patchValue({
                    lang_id: this.params['lang']
                });
            }
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: CountryService,
        protected confirmationService: ConfirmationService,
        protected langService: LangService
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
            name: ['', Validators.required],
            lang_id: ['', Validators.required],
            prefix: ['', Validators.required],
            sort: ['', Validators.required],
            territorial_area_1: '',
            territorial_area_2: '',
            territorial_area_3: ''
        });
    }
}
