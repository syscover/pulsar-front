import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { Country } from '../../admin/admin.models';
import { graphQL } from './warehouse.graphql';

@Component({
    selector: 'dh2-market-warehouse-detail',
    templateUrl: 'warehouse-detail.component.html',
    animations: fuseAnimations
})
export class WarehouseDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.WAREHOUSE';
    objectTranslationGender = 'M';
    countries: Country[];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required],
            active: false
        });
    }

    argumentsRelationsObject(): object
    {
        const sqlCountry = [
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

    setRelationsData(data: any): void
    {
        // set admin countries
        this.countries = data.adminCountries;
    }
}

