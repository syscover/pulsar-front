import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { Country } from '../../admin/admin.models';
import { graphQL } from './monument.graphql';

@Component({
    selector: 'dh2-innova-concrete-monument-detail',
    templateUrl: 'monument-detail.component.html',
    animations: fuseAnimations
})
export class MonumentDetailComponent extends CoreDetailComponent  implements OnInit
{
    public objectTranslation = 'INNOVA.MONUMENT';
    public objectTranslationGender = 'M';
    public loadingSlug = false;
    public graphQL = graphQL;
    public countries: Country[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            original_name: '',
            current_name: ['', Validators.required],
            slug: ['', Validators.required],
            other_denominations: '',
            original_use: '',
            current_use: '',
            commission: '',
            completion: '',
            rapporteur_name: '',
            rapporteur_email: '',
            rapporteur_date: '',
            percentage_progress: '',
            description: '',
            address: '',
            country_id: ['', Validators.required],
            province: '',
            locality: ['', Validators.required],
            zip: '',
            latitude: '',
            longitude: '',
        });
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
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
}
