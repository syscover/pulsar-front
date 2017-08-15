import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { AddressService } from './address.service';
import { Country, TerritorialArea1 } from './../../../../admin/admin.models';
import { environment } from './../../../../../environments/environment';
import * as _ from 'lodash';

//import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnChanges {

    countriesInput: SelectItem[] = [];
    territorialAreas1Input: SelectItem[] = [];

    @Input('countries') countries: Country[] = [];
    @Input('form') form: FormGroup;

    constructor(
        private addressService: AddressService
    ) { }

    ngOnInit() {
        this.form.addControl('address', new FormControl(''));
        this.form.addControl('country_id', new FormControl(''));
        this.form.addControl('territorial_area_1_id', new FormControl(''));
        this.form.addControl('territorial_area_2_id', new FormControl(''));
        this.form.addControl('territorial_area_3_id', new FormControl(''));
        this.form.addControl('cp', new FormControl(''));
        this.form.addControl('locality', new FormControl(''));
        this.form.addControl('latitude', new FormControl(''));
        this.form.addControl('longitude', new FormControl(''));
    }

    ngOnChanges () {
        this.countriesInput = _.map(this.countries, obj => {
            return { value: obj.id, label: obj.name };
        });
    }

    handleChangeCountry($event) {
        if ($event.value) {
            let country = _.find(this.countries, {id: $event.value});

            if (country) {
                this.addressService
                    .territorialAreas1(country)
                    .subscribe(({data}) => {
                        if (environment.debug) console.log('DEBUG - data response from get territorial area 1: ', data);

                        this.territorialAreas1Input = _.map(<TerritorialArea1[]>data['coreObjects'], obj => {
                            return { value: obj.id, label: obj.name };
                        });
                    });
            }
        }
    }

    handleChangeTerritorialArea1($event) {
    }

    handleChangeTerritorialArea2($event) {
    }

    handleChangeTerritorialArea3($event) {
    }
}
