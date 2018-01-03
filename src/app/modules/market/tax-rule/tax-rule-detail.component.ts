import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { TaxRuleGraphQLService } from './tax-rule-graphql.service';
import { TaxRule, TaxRateZone, CustomerClassTax, ProductClassTax } from './../market.models';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'app-tax-rule-detail',
    templateUrl: 'tax-rule-detail.component.html'
})
export class TaxRuleDetailComponent extends CoreDetailComponent implements OnInit {

    taxRateZones: SelectItem[] = [];
    customerClassTaxes: SelectItem[] = [];
    productClassTaxes: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: TaxRuleGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            translation: '',
            tax_rate_zones_id: [[], Validators.required],
            customer_class_taxes_id: [[], Validators.required],
            product_class_taxes_id: [[], Validators.required],
            priority: [null, Validators.required ],
            sort: [null, Validators.required ]
        });
    }

    afterPatchValueEdit() {
        // set product class taxes
        this.fg.controls['tax_rate_zones_id'].setValue(_.map(this.object['tax_rate_zones'], 'id'));
        // set customer class taxes
        this.fg.controls['customer_class_taxes_id'].setValue(_.map(this.object['customer_class_taxes'], 'id'));
        // set product class taxes
        this.fg.controls['product_class_taxes_id'].setValue(_.map(this.object['product_class_taxes'], 'id'));
    }

    setRelationsData(data: any) {

        // set tax rate zones
        this.taxRateZones = _.map(<TaxRateZone[]>data['marketTaxRateZones'], obj => {
            return { value: obj.id, label: obj.name };
        });

         // set customer class taxes
        this.customerClassTaxes = _.map(<CustomerClassTax[]>data['marketCustomerClassTaxes'], obj => {
            return { value: obj.id, label: obj.name };
        });

        // set product class taxes
        this.productClassTaxes = _.map(<ProductClassTax[]>data['marketProductClassTaxes'], obj => {
            return { value: obj.id, label: obj.name };
        });
    }
}
