import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { GroupCustomerClassTaxGraphQLService } from './group-customer-class-tax-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { Group } from './../../crm/crm.models';
import { CustomerClassTax } from './../market.models';
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

    createForm() {
        this.fg = this.fb.group({
            group_id: ['', Validators.required],
            customer_class_tax_id: ['', Validators.required]
        });
    }

    // instante custom arguments, for example in payment-method-detail.component.ts
    getCustomArgumentsGetRecord(args: Object, params: Params): any {
        return {
            model: this.graphQL.objectModel,
            sql: [{
                command: 'where',
                column: 'group_id',
                operator: '=',
                value: params['grId']
            },
            {
                command: 'where',
                column: 'customer_class_tax_id',
                operator: '=',
                value: params['txId']
            }]
        };
    }

    setRelationsData(data: any) {
        // set groups
        this.groups = _.map(<Group[]>data['crmGroups'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.groups.unshift({ label: 'Select a group', value: '' });

        // set customer class tax
        this.customerClassTaxes = _.map(<CustomerClassTax[]>data['marketCustomerClassTaxes'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.customerClassTaxes.unshift({ label: 'Select a customer class tax', value: '' });
    }

    getCustomArgumentsEditPostRecord(args: Object, object: any): Object {
        args['group_id'] = object.group_id;
        args['customer_class_tax_id'] = object.customer_class_tax_id;

        return args;
    }
}
