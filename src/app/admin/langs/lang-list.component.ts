import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { LangService } from './lang.service';
import { Lang } from '../admin.models';

@Component({
    selector: 'app-lang-list',
    templateUrl: './lang-list.component.html'
})
export class LangListComponent extends CoreListComponent implements OnInit {

    objects: Lang[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // fucntion to set custom data

    constructor(
        private router: Router,
        private objectService: LangService
    ) {
        super(objectService);
    }

    ngOnInit() {
        this.getRecords(this.f);
    }

    deleteRecord(object: Lang): void {
        super.deleteRecord(object, this.f);
    }
}
