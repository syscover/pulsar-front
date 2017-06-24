import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ActionService } from './action.service';
import { ActionGraphQL } from './action-graphql';

@Component({
    selector: 'ps-action-detail',
    templateUrl: './action-detail.component.html'
})
export class ActionDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected objectService: ActionService
    ) {
        super(injector, objectService);
        this.grahpQL = new ActionGraphQL();
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', Validators.required ],
            name: ['', Validators.required ]
        });
    }
}
