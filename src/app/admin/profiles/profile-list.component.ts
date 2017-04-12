import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ProfileService } from './profile.service';
import { Profile } from '../admin.models';

@Component({
    selector: 'app-profile-list',
    templateUrl: './profile-list.component.html'
})
export class ProfileListComponent extends CoreListComponent implements OnInit {

    objects: Profile[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private objectService: ProfileService
    ) {
        super(
            objectService,
            route
        );
    }

    ngOnInit() {
        this.getRecords(this.f);
    }
}
