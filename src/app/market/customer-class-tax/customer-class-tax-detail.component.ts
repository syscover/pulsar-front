import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { CustomerClassTaxService } from './../customer-class-tax/customer-class-tax.service';
import { CustomerClassTax } from './../market.models';

@Component({
    selector: 'app-customer-class-tax-detail',
    templateUrl: 'customer-class-tax-detail.component.html'
})
export class CustomerClassTaxDetailComponent extends CoreDetailComponent implements OnInit {

    // paramenters for parent class
    private object: CustomerClassTax = new CustomerClassTax(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.setValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: CustomerClassTaxService,
    ) {
        super(injector);
    }

    ngOnInit() {
        this.createForm(); // create form
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }
}
