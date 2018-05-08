import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { GroupCustomerClassTaxGraphQLService } from './group-customer-class-tax-graphql.service';
import { Group } from './../../crm/crm.models';
import { CustomerClassTax } from './../market.models';

@Component({
    selector: 'dh2-group-customer-class-tax-detail',
    templateUrl: 'group-customer-class-tax-detail.component.html',
    animations: fuseAnimations
})
export class GroupCustomerClassTaxDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.GROUP_CUSTOMER_CLASS_TAX';
    objectTranslationGender = 'M';
    groups: Group[];
    customerClassTaxes: CustomerClassTax[];
    baseUri = '/apps/market/taxes/group-customer-class-tax';

    constructor(
        protected injector: Injector,
        protected graphQL: GroupCustomerClassTaxGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            group_id: [null, Validators.required],
            customer_class_tax_id: [null, Validators.required]
        });
    }

    getCustomArgumentsGetRecord(args: Object, params: Params): any 
    {
        return {
            sql: [{
                command: 'where',
                column: 'group_id',
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
        // set crm groups
        this.groups = data.crmGroups;

        // set market customer class tax
        this.customerClassTaxes = data.marketCustomerClassTaxes;
    }

    getCustomArgumentsEditPostRecord(args: Object, object: any): Object
    {
        args['group_id'] = object.group_id;
        args['customer_class_tax_id'] = object.customer_class_tax_id;

        return args;
    }
}
