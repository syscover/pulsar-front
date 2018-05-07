import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { WarehouseGraphQLService } from './warehouse-graphql.service';
import { Country } from './../../admin/admin.models';

@Component({
    selector: 'dh2-warehouse-detail',
    templateUrl: 'warehouse-detail.component.html',
    animations: fuseAnimations
})
export class WarehouseDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'MARKET.WAREHOUSE';
    objectTranslationGender = 'M';
    countries: Country[];

    constructor(
        protected injector: Injector,
        protected graphQL: WarehouseGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            active: false
        });
    }

    argumentsRelationsObject(): Object
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

    setRelationsData(data: any)
    {
        // set admin countries
        this.countries = data.adminCountries;
    }
}

