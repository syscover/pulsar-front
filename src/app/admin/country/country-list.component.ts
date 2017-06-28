import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { CountryGraphQLService } from './country-graphql.service';

@Component({
    selector: 'ps-country-list',
    templateUrl: './country-list.component.html'
})
export class CountryListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'country.id', 'country.name'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected grahpQL: CountryGraphQLService
    ) {
        super(injector, grahpQL);
    }
}
