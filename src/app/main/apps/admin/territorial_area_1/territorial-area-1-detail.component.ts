import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { TerritorialArea1GraphQLService } from './territorial-area-1-graphql.service';
import { Country } from './../admin.models';

@Component({
    selector: 'dh2-territorial-area-1-detail',
    templateUrl: './territorial-area-1-detail.component.html',
    animations: fuseAnimations
})
export class TerritorialArea1DetailComponent extends CoreDetailComponent
{
    objectTranslationTranslated;
    objectTranslationGender = 'F';
    slugLoader = false;
    country: Country = new Country();

    constructor(
        protected injector: Injector,
        public graphQL: TerritorialArea1GraphQLService
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
        this.objectTranslationTranslated = this.country.territorial_area_1;
    }

    handlerCheckingSlug(isChecking)
    {
        this.slugLoader = isChecking;
    }
}