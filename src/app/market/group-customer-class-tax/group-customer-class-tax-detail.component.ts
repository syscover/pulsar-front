import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { GroupCustomerClassTaxService } from './group-customer-class-tax.service';
import { GroupCustomerClassTax } from '../market.models';

// custom imports
import { CustomerClassTax } from './../market.models';
import { CustomerClassTaxService } from './../customer-class-tax/customer-class-tax.service';
import { Group } from './../../crm/crm.models';
import { GroupService } from './../../crm/group/group.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'app-group-customer-class-tax-detail',
    templateUrl: 'group-customer-class-tax-detail.component.html'
})
export class GroupCustomerClassTaxDetailComponent extends CoreDetailComponent implements OnInit {

    private groups: SelectItem[] = [];
    private customerClassTaxes: SelectItem[] = [];

    // paramenters for parent class
    private object: GroupCustomerClassTax = new GroupCustomerClassTax(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data

            // data retuned has more data that fields form
            this.fg.patchValue(this.object); // patch values of form
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
        // load groups
        this.groupService.getRecords()
            .subscribe((response) => {

                this.groups = _.map(<Group[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.groups.unshift({ label: 'Select a group', value: '' });
            });

        // load customer class tax
        this.customerClassTaxService.getRecords()
            .subscribe((response) => {

                this.customerClassTaxes = _.map(<CustomerClassTax[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });
                this.customerClassTaxes.unshift({ label: 'Select a customer class tax', value: '' });
            });


        super.getRecordHasIdParamenter(this.f);
    }

    createForm() {
        this.fg = this.fb.group({
            group_id: ['', Validators.required ],
            customer_class_tax_id: ['', Validators.required ]
        });
    }
}
