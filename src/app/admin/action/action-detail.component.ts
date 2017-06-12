import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ActionService } from './action.service';

@Component({
    selector: 'ps-action-detail',
    templateUrl: './action-detail.component.html'
})
export class ActionDetailComponent extends CoreDetailComponent implements OnInit {

    constructor(
        protected injector: Injector,
        protected objectService: ActionService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {
        super.getRecordHasIdParamenter();
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', Validators.required ],
            name: ['', Validators.required ]
        });
    }
}
