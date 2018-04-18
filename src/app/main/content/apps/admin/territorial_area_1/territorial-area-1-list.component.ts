import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { TerritorialArea1GraphQLService } from './territorial-area-1-graphql.service';

@Component({
    selector: 'dh2-territorial-area-1-list',
    templateUrl: './territorial-area-1-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class TerritorialArea1ListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.ACTION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['admin_territorial_area_1.id', 'admin_territorial_area_1.name', 'admin_territorial_area_1.slug'];
    displayedColumns = ['admin_territorial_area_1,id', 'admin_territorial_area_1.name', 'actions'];
    country_id: string;
    filters = [
        {'command': 'where', 'column': 'admin_territorial_area_1.country_id', 'operator': '=', 'value': this.params['country_id']}
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: TerritorialArea1GraphQLService
    ) {
        super(injector, graphQL);

        // set country id to be used to reference field to create o edit object
        this.country_id = this.params['country_id'];
    }
}
