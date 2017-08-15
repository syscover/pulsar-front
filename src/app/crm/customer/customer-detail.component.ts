import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CustomerGraphQLService } from './customer-graphql.service';
import { Country } from './../../admin/admin.models';
import { Group } from './../crm.models';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-customer-detail',
    templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent extends CoreDetailComponent {

    groups: SelectItem[] = [];
    //countries: SelectItem[] = [];
    territorial_areas_1: SelectItem[] = [];
    countries: Country[];
    //_territorial_areas_1: TerritorialA[];

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [null, Validators.required],
            group_id: ['', Validators.required],
            name: null,
            surname: null,
            address: null,
            email: [null, Validators.required],
            user: [null, Validators.required],
            password: null,
            //re_password: null,
            active: null
        });
    }

    argumentsRelationsObject(): Object {
        let sqlCountry = [
            {
                command: 'where',
                column: 'admin_country.lang_id',
                operator: '=',
                value: this.baseLang
            }
        ];

        return {
            sqlCountry
        };
    }

    setRelationsData(data: any) {
        // set groups
        this.groups = _.map(<Group[]>data['crmGroups'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.groups.unshift({ label: 'Select a group', value: '' });

        // set countries
        this.countries = data['adminCountries'];
        /* this.countries = _.map(this._countries, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.countries.unshift({ label: 'Select a country', value: '' }); */
    }
}
