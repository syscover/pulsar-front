import { Component, OnInit, Injector } from '@angular/core';
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

    constructor(
        protected injector: Injector,
        public objectService: LangService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        super.getRecordHasIdParamenter();
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            name: ['', Validators.required],
            icon: ['', Validators.required],
            sort: '',
            active: ''
        });
    }
}
