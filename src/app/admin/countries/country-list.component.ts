import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { CountryService } from './country.service';
import { Country } from '../admin.models';
import { LangService } from './../langs/lang.service';
import { Lang } from './../admin.models';

@Component({
    selector: 'ps-country-list',
    templateUrl: './country-list.component.html'
})
export class CountryListComponent extends CoreListComponent implements OnInit {

    activatedLangs: Lang[];
    objects: Country[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private objectService: CountryService,
        private langService: LangService
    ) {
        super(
            objectService,
            route
        );
    }

    ngOnInit() {
        this.langService.getActivatedLangs().subscribe(data => {
            this.activatedLangs = data;
            this.getRecords(this.f);
        });
    }

    private hasAllLang(object) {
        console.log(JSON.parse(object.data_lang));
        return true;
    }
}
