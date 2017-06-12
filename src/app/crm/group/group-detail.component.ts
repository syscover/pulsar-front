import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';

import { GroupService } from './group.service';
import { Group } from '../crm.models';

@Component({
    selector: 'ps-group-detail',
    templateUrl: './group-detail.component.html'
})
export class GroupDetailComponent extends CoreDetailComponent implements OnInit {

    constructor(
        protected injector: Injector,
        protected objectService: GroupService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        super.getRecordHasIdParamenter();
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }
}
