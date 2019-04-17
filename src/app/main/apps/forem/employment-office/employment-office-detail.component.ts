import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { Country } from '../../admin/admin.models';
import { graphQL } from './employment-office.graphql';

@Component({
    selector: 'dh2-forem-employment-office-detail',
    templateUrl: 'employment-office-detail.component.html',
    animations: fuseAnimations
})
export class EmploymentOfficeDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'FOREM.EMPLOYMENT_OFFICE';
    objectTranslationGender = 'F';
    countries: Country[] = [];
    loadingSlug = false;

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            code: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            address: '',
            country_id: '',
            territorial_area_1_id: '',
            territorial_area_2_id: '',
            territorial_area_3_id: '',
            zip: '',
            locality: '',
            latitude: '',
            longitude: ''
        });
    }

    argumentsRelationsObject(): object
    {
        const sqlCountry = [
            {
                command: 'where',
                column: 'lang_id',
                operator: '=',
                value: this.params['lang'] ? this.params['lang'] : this.baseLang
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_country.name'
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

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }
}
