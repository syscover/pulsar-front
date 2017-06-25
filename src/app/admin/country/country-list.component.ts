import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { CountryService } from './country.service';
import { Country, Lang } from '../admin.models';
import { CountryGraphQL } from './country-graphql';

@Component({
    selector: 'ps-country-list',
    templateUrl: './country-list.component.html'
})
export class CountryListComponent extends CoreListComponent {

    //activatedLangs: Lang[];

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'country.id', 'country.name'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected objectService: CountryService
    ) {
        super(injector, objectService);
        this.grahpQL = new CountryGraphQL();
    }
}
