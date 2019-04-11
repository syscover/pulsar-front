import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { Country } from '../admin.models';
import { graphQL } from './territorial-area-1.graphql';

@Component({
    selector: 'dh2-admin-territorial-area-1-list',
    templateUrl: './territorial-area-1-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class TerritorialArea1ListComponent extends CoreListComponent
{
    objectTranslationTranslated;
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['admin_territorial_area_1.id', 'admin_territorial_area_1.name', 'admin_territorial_area_1.slug'];
    displayedColumns = ['admin_territorial_area_1.id', 'admin_territorial_area_1.name', 'admin_territorial_area_1.slug',  'actions'];
    country: Country = new Country();
    filters = [
        {'command': 'where', 'column': 'admin_territorial_area_1.country_id', 'operator': '=', 'value': this.params['country_id']}
    ];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    // overwite method to get statuses
    getCustomArgumentsGetRecords(args: object): object
    {    
        args['sqlCountry'] = [{
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
        }];
        
        return args;
    }

    setRelationsData(data: any): void
    {
        // admin country
        this.country = data.adminCountry;
        this.objectTranslationTranslated = this.country.territorial_area_1;
    }
}
