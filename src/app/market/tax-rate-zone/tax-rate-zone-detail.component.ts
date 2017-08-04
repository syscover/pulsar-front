import { Component, Injector } from '@angular/core';
import { Params } from '@angular/router';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { TaxRateZoneGraphQLService } from './tax-rate-zone-graphql.service';
import { TaxRateZone } from './../market.models';
import { SelectItem } from 'primeng/primeng';
import { Country } from './../../admin/admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'app-tax-rate-zone-detail',
    templateUrl: 'tax-rate-zone-detail.component.html'
})
export class TaxRateZoneDetailComponent extends CoreDetailComponent {

    countries: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: TaxRateZoneGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            country_id: ['', Validators.required ],
            territorial_area_1_id: null,
            territorial_area_2_id: null,
            territorial_area_3_id: null,
            cp: '',
            tax_rate: [null, Validators.required ]
        });
    }

    getArgsToGetRecord(params: Params) {
        return {
            model: this.graphQL.objectModel,
            sql: [{
                command: 'where',
                column: 'tax_rate_zone.id',
                operator: '=',
                value: params['id']
            }],
            sqlCountry: [{
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            }]
        };
    }

    getCustomArgumentsForGraphQLDataRelationsToCreateObject(): Object {
        let sqlCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            }
        ];

        return {
            sqlCountry
        };
    }

    setDataRelationsObject(data: any) {
        // set countries
        this.countries = _.map(<Country[]>data['adminCountries'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.countries.unshift({ label: 'Select a country', value: '' });
    }
}
