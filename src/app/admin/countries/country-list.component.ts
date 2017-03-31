import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { CountryService } from './country.service';
import { Country } from '../admin.models';

@Component({
    selector: 'ps-country-list',
    templateUrl: './country-list.component.html'
})
export class CountryListComponent extends CoreListComponent implements OnInit {

    objects: Country[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // fucntion to set custom data

    constructor(
        private router: Router,
        private objectService: CountryService
    ) {
        super(objectService);
    }

    ngOnInit() {
        this.getRecords(this.f);
    }
}
