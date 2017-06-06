import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { TaxRateZoneService } from './tax-rate-zone.service';
import { TaxRateZone } from './../market.models';
import { CountryService } from './../../admin/country/country.service';
import { Country } from './../../admin/admin.models';

import * as _ from 'lodash';

@Component({
    selector: 'app-tax-rate-zone-detail',
    templateUrl: 'tax-rate-zone-detail.component.html'
})
export class TaxRateZoneDetailComponent extends CoreDetailComponent implements OnInit {

    countries: SelectItem[] = [];

    // paramenters for parent class
    object: TaxRateZone = new TaxRateZone(); // set empty object
    private f: Function = (response = undefined) => {
        if (this.dataRoute.action === 'edit') {
            this.object = response.data; // function to set custom data

            this.fg.patchValue(this.object); // set values of form

            // TODO, apaño para establecer un valor por defecto
            this.fg.controls['country_id'].setValue(this.object.country);
            this.fg.controls['country_id'].setValue(this.object.country.id, { emitModelToViewChange: false });
        }
    }

    constructor(
        protected injector: Injector,
        protected objectService: TaxRateZoneService,
        protected countryService: CountryService
    ) {
        super(injector);
        this.baseUri = objectService.baseUri;
    }

    ngOnInit() {
        // get countries
        this.countryService.getRecords([this.baseLang])
            .subscribe((response) => {
                //this.countries = <Country[]>response.data;

                this.countries = _.map(<Country[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get types
                this.countries.unshift({ label: 'Select a country', value: '' });

                super.getRecordHasIdParamenter(this.f);
            });
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            country_id: '',
            cp: '',
            tax_rate: [null, Validators.required ]
        });
    }
}
