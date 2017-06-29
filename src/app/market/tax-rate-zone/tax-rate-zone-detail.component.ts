import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { TaxRateZoneGraphQLService } from './tax-rate-zone-graphql.service';
import { TaxRateZone } from './../market.models';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'app-tax-rate-zone-detail',
    templateUrl: 'tax-rate-zone-detail.component.html'
})
export class TaxRateZoneDetailComponent extends CoreDetailComponent {

    countries: SelectItem[] = [];

    // paramenters for parent class
    object: TaxRateZone = new TaxRateZone(); // set empty object
    customCallback: Function = (response = undefined) => {
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
        protected graphQL: TaxRateZoneGraphQLService
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {
        // get countries
        /*this.countryService.getRecords([this.baseLang])
            .subscribe((response) => {

                this.countries = _.map(<Country[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get types
                this.countries.unshift({ label: 'Select a country', value: '' });

            });*/
        super.init();
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
