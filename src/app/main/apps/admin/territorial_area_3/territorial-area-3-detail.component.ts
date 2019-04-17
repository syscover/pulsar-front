import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { Country, TerritorialArea2 } from '../admin.models';
import * as _ from 'lodash';
import { graphQL } from './territorial-area-3.graphql';

@Component({
    selector: 'dh2-admin-territorial-area-3-detail',
    templateUrl: './territorial-area-3-detail.component.html',
    animations: fuseAnimations
})
export class TerritorialArea3DetailComponent extends CoreDetailComponent
{
    objectTranslationTranslated;
    objectTranslationGender = 'F';
    slugLoader = false;
    country: Country = new Country();
    territorialAreas2: TerritorialArea2[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);

        // set field_id in reactive form
        this.fg.controls['country_id'].setValue(this.params['country_id']);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: ['', Validators.required],
            country_id: '',
            territorial_area_1_id: ['', Validators.required],
            territorial_area_2_id: ['', Validators.required],
            name: ['', Validators.required],
            slug: ''
        });
    }

    argumentsRelationsObject(): object
    {
        const sqlCountry = [
            {
                command: 'where',
                column: 'admin_country.id',
                operator: '=',
                value: this.params['country_id']
            },
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
        // admin country
        this.country = data.adminCountry;
        this.objectTranslationTranslated = this.country.territorial_area_3;
    }

    beforePatchValueEdit(): void
    {
        this.handleChangeTerritorialArea1({ value: this.object.territorial_area_1_id });
    }

    handleChangeTerritorialArea1(event): void
    {
        this.territorialAreas2 = <TerritorialArea2[]> _.filter(this.country.territorial_areas_2, { 'territorial_area_1_id': event.value });
    }

    handleCheckingSlug(isChecking): void
    {
        this.slugLoader = isChecking;
    }
}
