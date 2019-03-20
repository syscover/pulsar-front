import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { Country } from '../../admin/admin.models';
import { ARQUITECTS, ARTISTS, ENGENIEERS, OTHERS, Characteristic, People } from '../innova-concrete.models';
import { graphQL } from './monument.graphql';
import * as _ from 'lodash';

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
    public characteristics: Characteristic[] = [];
    public architects: People[] = [];
    public engineers: People[] = [];
    public artists: People[] = [];
    public others: People[] = [];

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
            architects_id: [],
            engineers_id: [],
            artists_id: [],
            others_id: [],
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

    afterPatchValueEdit(): void
    {
        // set architects id
        this.fg.get('architects_id').setValue(_.map(_.filter(this.object.peoples, {'group_id': ARQUITECTS}), 'id'));

        // set engineers id
        this.fg.get('engineers_id').setValue(_.map(_.filter(this.object.peoples, {'group_id': ENGENIEERS}), 'id'));

        // set artists id
        this.fg.get('artists_id').setValue(_.map(_.filter(this.object.peoples, {'group_id': ARTISTS}), 'id'));

        // set others id
        this.fg.get('others_id').setValue(_.map(_.filter(this.object.peoples, {'group_id': OTHERS}), 'id'));
    }

    setRelationsData(data: any): void
    {
        // set admin countries
        this.countries = data.adminCountries;

        // set characteristics
        this.characteristics = data.innovaConcreteCharacteristics;

        // set architects
        this.architects = <People[]>_.filter(data.innovaConcretePeoples, {'group_id': ARQUITECTS});

        // set engineers
        this.engineers = <People[]>_.filter(data.innovaConcretePeoples, {'group_id': ENGENIEERS});

        // set artists
        this.artists = <People[]>_.filter(data.innovaConcretePeoples, {'group_id': ARTISTS});

        // set others
        this.others = <People[]>_.filter(data.innovaConcretePeoples, {'group_id': OTHERS});
    }
}
