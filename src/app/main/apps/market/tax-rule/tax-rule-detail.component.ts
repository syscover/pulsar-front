import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { TaxRuleGraphQLService } from './tax-rule-graphql.service';
import { TaxRateZone, CustomerClassTax, ProductClassTax } from './../market.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-market-tax-rule-detail',
    templateUrl: 'tax-rule-detail.component.html',
    animations: fuseAnimations
})
export class TaxRuleDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.TAX_RULE';
    objectTranslationGender = 'F';
    baseUri = '/apps/market/taxes/tax-rule';
    taxRateZones: TaxRateZone[] = [];
    customerClassTaxes: CustomerClassTax[] = [];
    productClassTaxes: ProductClassTax[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: TaxRuleGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            translation: null,
            tax_rate_zones_id: [[], Validators.required],
            customer_class_taxes_id: [[], Validators.required],
            product_class_taxes_id: [[], Validators.required],
            priority: [null, Validators.required ],
            sort: [null, Validators.required ]
        });
    }

    afterPatchValueEdit()
    {
        // set market product class taxes
        this.fg.controls['tax_rate_zones_id'].setValue(_.map(this.object.tax_rate_zones, 'id'));
        // set market customer class taxes
        this.fg.controls['customer_class_taxes_id'].setValue(_.map(this.object.customer_class_taxes, 'id'));
        // set market product class taxes
        this.fg.controls['product_class_taxes_id'].setValue(_.map(this.object.product_class_taxes, 'id'));
    }

    setRelationsData(data: any) 
    {
        // set market tax rate zones
        this.taxRateZones = data.marketTaxRateZones;

         // set market customer class taxes
        this.customerClassTaxes = data.marketCustomerClassTaxes;

        // set market product class taxes
        this.productClassTaxes = data.marketProductClassTaxes;
    }
}

