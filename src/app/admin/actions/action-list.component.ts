import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ActionService } from './action.service';
import { Action } from '../admin.models';

@Component({
    selector: 'ps-action-list',
    templateUrl: './action-list.component.html'
})
export class ActionListComponent extends CoreListComponent implements OnInit {

    objects: Action[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // fucntion to set custom data

    constructor(
        private router: Router,
        private objectService: ActionService
    ) {
        super(objectService);
    }

    ngOnInit() {
        this.getRecords(this.f);
    }
}
