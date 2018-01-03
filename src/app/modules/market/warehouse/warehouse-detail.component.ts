import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { WarehouseGraphQLService } from './warehouse-graphql.service';
import { Country } from './../../admin/admin.models';
import { Warehouse } from './../market.models';

@Component({
    selector: 'ps-warehouse-detail',
    templateUrl: './warehouse-detail.component.html'
})
export class WarehouseDetailComponent extends CoreDetailComponent {

    countries: Country[];

    constructor(
        protected injector: Injector,
        protected graphQL: WarehouseGraphQLService,
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: ['', Validators.required],
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
        // set countries
        this.countries = data['adminCountries'];
    }
}
