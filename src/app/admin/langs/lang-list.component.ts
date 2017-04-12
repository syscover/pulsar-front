import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { LangService } from './lang.service';
import { Lang } from '../admin.models';

import { MenuItem } from 'primeng/primeng';

@Component({
    selector: 'app-lang-list',
    templateUrl: './lang-list.component.html'
})
export class LangListComponent extends CoreListComponent implements OnInit {

    items: MenuItem;
    objects: Lang[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private objectService: LangService
    ) {
        super(
            objectService,
            route
        );
    }

    ngOnInit() {
        this.getRecords(this.f);

        this.items = [
            {
                label: 'Next',
                icon: 'fa-chevron-right'
            },
            {
                label: 'Prev',
                icon: 'fa-chevron-left'
            }
        ];
    }
}
