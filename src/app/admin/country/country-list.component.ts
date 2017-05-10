import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { CountryService } from './country.service';
import { Country, Lang } from '../admin.models';
import { LangService } from './../lang/lang.service';

@Component({
    selector: 'ps-country-list',
    templateUrl: './country-list.component.html'
})
export class CountryListComponent extends CoreListComponent {

    activatedLangs: Lang[];

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'country.id', 'country.name', 'lang.name'
    ];
    objects: Country[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected langService: LangService,

        // service for parent class
        protected injector: Injector,
        protected objectService: CountryService
    ) {
        super(injector);
    }
}
