import { Component } from '@angular/core';
import { LazyLoadEvent, DataTable } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { CountryService } from './country.service';
import { Country } from '../admin.models';
import { LangService } from './../langs/lang.service';
import { Lang } from './../admin.models';

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
        private langService: LangService,

        // service for parent class
        private objectService: CountryService
    ) {
        super(
            objectService
        );
    }

    // overwritte method
    loadDadaTableLazy(event: LazyLoadEvent, f: Function) {
        // only get activated langs when activatedLangs is not instantiated
        if (this.activatedLangs) {
            super.loadDadaTableLazy(event, f, 'es');
        } else {
            this.langService.getActivatedLangs().subscribe(response => {
                this.activatedLangs = <Lang[]>response.data;
                super.loadDadaTableLazy(event, f, 'es');
            });
        }
    }
}
