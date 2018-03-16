import { Component, Injector, OnInit } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { CountryGraphQLService } from './country-graphql.service';

@Component({
    selector: 'dh2-country-list',
    templateUrl: './country-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/core-list-component.scss']
})
export class CountryListComponent extends CoreListComponent 
{
    objectTranslation = 'ADMIN.COUNTRY';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_country.id', 'admin_country.name', 'admin_country.slug'];
    displayedColumns = ['id', 'name', 'slug', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected injector: Injector,
        protected graphQL: CountryGraphQLService
    ) {
        super(injector, graphQL);
    }
}
