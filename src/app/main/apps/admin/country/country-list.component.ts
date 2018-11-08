import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './country.graphql';

@Component({
    selector: 'dh2-country-list',
    templateUrl: './country-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class CountryListComponent extends CoreListComponent 
{
    objectTranslation = 'APPS.COUNTRY';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_country.id', 'admin_country.name', 'admin_country.slug'];
    displayedColumns = ['admin_country.id', 'admin_country.name', 'admin_country.slug', 'translations', 'territories', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
