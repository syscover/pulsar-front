import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { GroupCustomerClassTaxGraphQLService } from './group-customer-class-tax-graphql.service';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'app-group-customer-class-tax-detail',
    templateUrl: 'group-customer-class-tax-detail.component.html'
})
export class GroupCustomerClassTaxDetailComponent extends CoreDetailComponent {

    groups: SelectItem[] = [];
    customerClassTaxes: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: GroupCustomerClassTaxGraphQLService
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {
        // load groups
        /*this.groupService.getRecords()
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
            });*/

        super.init();
    }

    createForm() {
        this.fg = this.fb.group({
            group_id: ['', Validators.required ],
            customer_class_tax_id: ['', Validators.required ]
        });
    }
}
