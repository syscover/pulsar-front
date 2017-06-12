import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { TaxRuleService } from './tax-rule.service';
import { CustomerClassTaxService } from './../customer-class-tax/customer-class-tax.service';
import { TaxRateZoneService } from './../tax-rate-zone/tax-rate-zone.service';
import { ProductClassTaxService } from './../product-class-tax/product-class-tax.service';
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

    // paramenters for parent class
    object: TaxRule = new TaxRule(); // set empty object
    customCallback: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data
            this.fg.patchValue(this.object); // set values of form

            // set product class taxes
            this.fg.controls['tax_rate_zones_id'].setValue(_.map(this.object.tax_rate_zones, 'id'));
            // set customer class taxes
            this.fg.controls['customer_class_taxes_id'].setValue(_.map(this.object.customer_class_taxes, 'id'));
            // set product class taxes
            this.fg.controls['product_class_taxes_id'].setValue(_.map(this.object.product_class_taxes, 'id'));
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: TaxRuleService,
        protected taxRateZoneService: TaxRateZoneService,
        protected customerClassTaxService: CustomerClassTaxService,
        protected productClassTaxService: ProductClassTaxService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        // get tax rate zones
        this.taxRateZoneService.getRecords()
            .subscribe((response) => {

            this.taxRateZones = _.map(<TaxRateZone[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            });
        });

        // get customer class taxes
        this.customerClassTaxService.getRecords()
            .subscribe((response) => {

            this.customerClassTaxes = _.map(<CustomerClassTax[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            });
        });

        // get product class taxes
        this.productClassTaxService.getRecords()
            .subscribe((response) => {

            this.productClassTaxes = _.map(<ProductClassTax[]>response.data, obj => {
                return { value: obj.id, label: obj.name };
            });
        });

        // get object
        super.init();
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
}
