import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/primeng';
import { AddressService } from './address.service';
import { Country, TerritorialArea1, TerritorialArea2, TerritorialArea3 } from './../../../../admin/admin.models';
import { environment } from './../../../../../environments/environment';
import * as _ from 'lodash';

//import { onValueChangedFormControl } from './../../super/core-validation';

@Component({
    selector: 'ps-address',
    templateUrl: './address.component.html',
    styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnChanges {

    @Input('form') form: FormGroup;
    @Input('object') object: any;
    @Input('countries') countries: Country[] = [];
    @Input('errors') errors: Object;

    territorialAreas1: TerritorialArea1[] = [];
    territorialAreas2: TerritorialArea2[] = [];
    territorialAreas3: TerritorialArea3[] = [];

    countriesInput: SelectItem[] = [];
    territorialAreas1Input: SelectItem[] = [];
    territorialAreas2Input: SelectItem[] = [];
    territorialAreas3Input: SelectItem[] = [];

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

    // load values
    ngOnChanges () {
        // load countries from Input
        this.countriesInput = _.map(this.countries, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.countriesInput.unshift({ label: 'Select a country', value: '' });

        // check that object has properties
        if (Object.keys(this.object).length !== 0) {
            let sqlAdminTerritorialAreas1, sqlAdminTerritorialAreas2, sqlAdminTerritorialAreas3 = undefined;

            // load territorial area 1
            if (this.object.country_id !== undefined) {

                // set new country
                this.addressService.country = _.find(this.countries, {id: this.object.country_id});

                sqlAdminTerritorialAreas1 = [
                    {
                        command: 'where',
                        column: 'country_id',
                        operator: '=',
                        value: this.object.country_id
                    },
                    {
                        command: 'where',
                        column: 'admin_country.lang_id',
                        operator: '=',
                        value: this.addressService.country.lang_id
                    }
                ];

                // load territorial area 2
                if (this.object.territorial_area_1_id !== undefined) {
                    sqlAdminTerritorialAreas2 = [
                        {
                            command: 'where',
                            column: 'territorial_area_1_id',
                            operator: '=',
                            value: this.object.territorial_area_1_id
                        },
                        {
                            command: 'where',
                            column: 'admin_country.lang_id',
                            operator: '=',
                            value: this.addressService.country.lang_id
                        }
                    ];

                    // load territorial area 3
                    if (this.object.territorial_area_2_id !== undefined) {
                        sqlAdminTerritorialAreas3 = [
                            {
                                command: 'where',
                                column: 'territorial_area_2_id',
                                operator: '=',
                                value: this.object.territorial_area_2_id
                            },
                            {
                                command: 'where',
                                column: 'admin_country.lang_id',
                                operator: '=',
                                value: this.addressService.country.lang_id
                            }
                        ];
                    }
                }
            }

            let obs =  this.addressService
                .gerResources({
                    sqlAdminTerritorialAreas1,
                    sqlAdminTerritorialAreas2,
                    sqlAdminTerritorialAreas3
                })
                .subscribe(({data}) => {

                    if (data['adminTerritorialAreas1'].length > 0) {
                        this.territorialAreas1 = data['adminTerritorialAreas1'];
                        this.territorialAreas1Input = _.map(this.territorialAreas1, obj => {
                            return { value: obj.id, label: obj.name };
                        });
                        this.territorialAreas1Input.unshift({ label: `Select a ${this.addressService.country.territorial_area_1}`, value: '' });
                    }

                    if (data['adminTerritorialAreas2'].length > 0) {
                        this.territorialAreas2 = data['adminTerritorialAreas2'];
                        this.territorialAreas2Input = _.map(this.territorialAreas2, obj => {
                            return { value: obj.id, label: obj.name };
                        });
                        this.territorialAreas2Input.unshift({ label: `Select a ${this.addressService.country.territorial_area_2}`, value: '' });
                    }

                    if (data['adminTerritorialAreas3'].length > 0) {
                        this.territorialAreas3 = data['adminTerritorialAreas3'];
                        this.territorialAreas3Input = _.map(this.territorialAreas3, obj => {
                            return { value: obj.id, label: obj.name };
                        });
                        this.territorialAreas3Input.unshift({ label: `Select a ${this.addressService.country.territorial_area_3}`, value: '' });
                    }

                    obs.unsubscribe();
                });
        }
    }

    handleChangeCountry($event) {

        this.territorialAreas1Input = [];
        this.territorialAreas2Input = [];
        this.territorialAreas3Input = [];

        if ($event.value) {
            // set new country
            this.addressService.country = _.find(this.countries, {id: $event.value});

            if (this.addressService.country) {
                let obs = this.addressService
                    .territorialAreas1(this.addressService.country)
                    .subscribe(({data}) => {
                        if (environment.debug) console.log('DEBUG - data response from get territorial area 1: ', data);

                        if (data['coreObjects'].length > 0) {
                            this.territorialAreas1 = data['coreObjects'];
                            this.territorialAreas1Input = _.map(this.territorialAreas1, obj => {
                                return { value: obj.id, label: obj.name };
                            });
                            this.territorialAreas1Input.unshift({ label: `Select a ${this.addressService.country.territorial_area_1}`, value: '' });
                        }

                        obs.unsubscribe();
                    });
            }
        }
    }

    handleChangeTerritorialArea1($event) {
        if ($event.value) {
            let territorialArea1 = _.find(this.territorialAreas1, {id: $event.value});

            if (territorialArea1) {
                let obs = this.addressService
                    .territorialAreas2(territorialArea1)
                    .subscribe(({data}) => {
                        if (environment.debug) console.log('DEBUG - data response from get territorial area 2: ', data);

                        if (data['coreObjects'].length > 0) {
                            this.territorialAreas2 = data['coreObjects'];
                            this.territorialAreas2Input = _.map(this.territorialAreas2, obj => {
                                return { value: obj.id, label: obj.name };
                            });
                            this.territorialAreas2Input.unshift({ label: `Select a ${this.addressService.country.territorial_area_2}`, value: '' });
                        }

                        obs.unsubscribe();
                    });
            }
        }
    }

    handleChangeTerritorialArea2($event) {
        if ($event.value) {
            let territorialArea2 = _.find(this.territorialAreas2, {id: $event.value});

            if (territorialArea2) {
                let obs = this.addressService
                    .territorialAreas3(territorialArea2)
                    .subscribe(({data}) => {
                        if (environment.debug) console.log('DEBUG - data response from get territorial area 3: ', data);

                        if (data['coreObjects'].length > 0) {
                            this.territorialAreas3 = data['coreObjects'];
                            this.territorialAreas3Input = _.map(this.territorialAreas3, obj => {
                                return { value: obj.id, label: obj.name };
                            });
                            this.territorialAreas3Input.unshift({ label: `Select a ${this.addressService.country.territorial_area_3}`, value: '' });
                        }

                        obs.unsubscribe();
                    });
            }
        }
    }
}
