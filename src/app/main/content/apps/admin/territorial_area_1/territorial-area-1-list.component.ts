import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { TerritorialArea1GraphQLService } from './territorial-area-1-graphql.service';
import { Country } from './../admin.models';

@Component({
    selector: 'dh2-territorial-area-1-list',
    templateUrl: './territorial-area-1-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class TerritorialArea1ListComponent extends CoreListComponent
{
    objectTranslationTranslated;
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['admin_territorial_area_1.id', 'admin_territorial_area_1.name', 'admin_territorial_area_1.slug'];
    displayedColumns = ['admin_territorial_area_1.id', 'admin_territorial_area_1.name', 'actions'];
    country: Country = new Country();
    filters = [
        {'command': 'where', 'column': 'admin_territorial_area_1.country_id', 'operator': '=', 'value': this.params['country_id']}
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: TerritorialArea1GraphQLService
    ) {
        super(injector, graphQL);
    }

    // overwite method to get statuses
    getCustomArgumentsGetRecords(args: Object): Object
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

    setRelationsData(data: any) 
    {
        // admin country
        this.country = data.adminCountry;
        this.objectTranslationTranslated = this.country.territorial_area_1;
    }
}
