import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ProfileService } from './profile.service';
import { Profile } from '../admin.models';

@Component({
    selector: 'app-profile-list',
    templateUrl: './profile-list.component.html'
})
export class ProfileListComponent extends CoreListComponent implements OnInit {

    objects: Profile[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // fucntion to set custom data

    constructor(
        private router: Router,
        private objectService: ProfileService
    ) {
        super(objectService);
    }

    ngOnInit() {
        this.getRecords(this.f);
    }

    deleteRecord(object: Profile): void {
        super.deleteRecord(object, this.f);
    }
}