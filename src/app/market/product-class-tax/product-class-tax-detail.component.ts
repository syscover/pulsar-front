import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { ProductClassTaxService } from './product-class-tax.service';
import { ProductClassTax } from '../market.models';

@Component({
    selector: 'app-product-class-tax-detail',
    templateUrl: 'product-class-tax-detail.component.html'
})
export class ProductClassTaxDetailComponent extends CoreDetailComponent implements OnInit {

    // paramenters for parent class
    private object: ProductClassTax = new ProductClassTax(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.setValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: ProductClassTaxService,
    ) {
        super(injector);
    }

    ngOnInit() {
        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }

}
