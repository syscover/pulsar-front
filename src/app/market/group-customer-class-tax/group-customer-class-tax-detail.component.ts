import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { GroupCustomerClassTaxService } from './group-customer-class-tax.service';
import { GroupCustomerClassTax } from '../market.models';

// custom imports
import { CustomerClassTaxService } from './../customer-class-tax/customer-class-tax.service';
import { GroupService } from './../../crm/groups/group.service';

@Component({
    selector: 'app-group-customer-class-tax-detail',
    templateUrl: 'group-customer-class-tax-detail.component.html'
})
export class GroupCustomerClassTaxDetailComponent extends CoreDetailComponent implements OnInit {

    // paramenters for parent class
    private object: GroupCustomerClassTax = new GroupCustomerClassTax(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.setValue(this.object); // set values of form
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: GroupCustomerClassTaxService,
        protected customerClassTaxService: CustomerClassTaxService,
        protected groupService: GroupService
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
