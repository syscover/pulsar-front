import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { LangService } from './lang.service';
import { Lang } from '../admin.models';
import { onValueChangedFormGroup } from './../../shared/super/core-validation';
import { ValidationMessageService } from './../../core/services/validation-message.service';

@Component({
    selector: 'ps-lang-detail',
    templateUrl: 'lang-detail.component.html'
})
export class LangDetailComponent extends CoreDetailComponent implements OnInit {

    private baseUri = '/pulsar/admin/langs';
    private fg: FormGroup;
    private object: Lang = new Lang(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.setValue(this.object); // set values of form
        }
        // with other action
    }

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private objectService: LangService,
        private validationMessageService: ValidationMessageService
    ) {
        super(
            router,
            route,
            objectService
        );
    }

    ngOnInit() {
        super.getRecordHasIdParamenter(this.f);
        this.createForm(); // create form
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            name: ['', Validators.required],
            icon: ['', Validators.required],
            sort: '',
            base: '',
            active: ''
        });

        /*this.fg
            .valueChanges
            .subscribe(data => this.formErrors = onValueChanged(this.fg, data, this.validationMessageService));*/

        //this.formErrors = onValueChanged(this.fg);
    }

}
