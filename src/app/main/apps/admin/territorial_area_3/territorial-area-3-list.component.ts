import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { Country } from '../admin.models';
import { graphQL } from './territorial-area-3.graphql';

@Component({
    selector: 'dh2-admin-territorial-area-3-list',
    templateUrl: './territorial-area-3-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class TerritorialArea3ListComponent extends CoreListComponent
{
    objectTranslationTranslated;
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['admin_territorial_area_3.id', 'admin_territorial_area_3.name', 'admin_territorial_area_3.slug', 'admin_territorial_area_1.name', 'admin_territorial_area_2.name'];
    displayedColumns = ['admin_territorial_area_3.id', 'admin_territorial_area_3.name', 'admin_territorial_area_1.name', 'admin_territorial_area_2.name', 'actions'];
    country: Country = new Country();
    filters = [
        {'command': 'where', 'column': 'admin_territorial_area_3.country_id', 'operator': '=', 'value': this.params['country_id']}
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
            value: this.baseLang.id
        }];
        
        return args;
    }

    setRelationsData(data: any): void
    {
        // admin country
        this.country = data.adminCountry;
        this.objectTranslationTranslated = this.country.territorial_area_3;
    }
}
