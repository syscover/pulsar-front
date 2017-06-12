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

    constructor(
        protected injector: Injector,
        protected objectService: CustomerClassTaxService,
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        super.getRecordHasIdParamenter();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }
}
