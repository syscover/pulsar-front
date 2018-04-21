import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { TerritorialArea3GraphQLService } from './territorial-area-3-graphql.service';
import { Country, TerritorialArea2 } from './../admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-territorial-area-3-detail',
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
        protected injector: Injector,
        public graphQL: TerritorialArea3GraphQLService
    ) {
        super(injector, graphQL);

        // set field_id in reactive form
        this.fg.controls['country_id'].setValue(this.params['country_id']);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            ix: null,
            id: [null, Validators.required],
            country_id: null,
            territorial_area_1_id: [null, Validators.required],
            territorial_area_2_id: [null, Validators.required],
            name: [null, Validators.required],
            slug: null
        });
    }

    argumentsRelationsObject(): Object
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

    setRelationsData(data: any) 
    {
        // admin country
        this.country = data.adminCountry;
        this.objectTranslationTranslated = this.country.territorial_area_3;
    }

    beforePatchValueEdit()
    {
        this.handlerChangeTerritorialArea1({ value: this.object.territorial_area_1_id });
    }

    handlerChangeTerritorialArea1(event)
    {
        this.territorialAreas2 = _.filter(this.country.territorial_areas_2, { 'territorial_area_1_id': event.value });
    }

    handlerCheckingSlug(isChecking)
    {
        this.slugLoader = isChecking;
    }
}
