import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { CustomerGroupCustomerClassTaxGraphQLService } from './customer-group-customer-class-tax-graphql.service';
import { CustomerGroup } from './../../crm/crm.models';
import { CustomerClassTax } from './../market.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-customer-group-customer-class-tax-detail',
    templateUrl: 'customer-group-customer-class-tax-detail.component.html',
    animations: fuseAnimations
})
export class CustomerGroupCustomerClassTaxDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.CUSTOMER_GROUP_CUSTOMER_CLASS_TAX';
    objectTranslationGender = 'M';
    customerGroups: CustomerGroup[];
    customerClassTaxes: CustomerClassTax[];
    baseUri = '/apps/market/taxes/customer-group-customer-class-tax';
    name: string;

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGroupCustomerClassTaxGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            customer_group_id: [null, Validators.required],
            customer_class_tax_id: [null, Validators.required]
        });
    }

    getCustomArgumentsGetRecord(args: Object, params: Params): any 
    {
        return {
            sql: [{
                command: 'where',
                column: 'customer_group_id',
                operator: '=',
                value: params['group_id']
            },
            {
                command: 'where',
                column: 'customer_class_tax_id',
                operator: '=',
                value: params['tax_id']
            }]
        };
    }

    setRelationsData(data: any) 
    {
        // set name of objecet
        this.name = (<CustomerGroup>_.find(data.crmCustomerGroups, {id: data.coreObject.customer_group_id})).name;

        // set crm customer groups
        this.customerGroups = data.crmCustomerGroups;

        // set market customer class tax
        this.customerClassTaxes = data.marketCustomerClassTaxes;
    }

    getCustomArgumentsEditPostRecord(args: Object, object: any): Object
    {
        args['customer_group_id'] = object.customer_group_id;
        args['customer_class_tax_id'] = object.customer_class_tax_id;

        return args;
    }
}
