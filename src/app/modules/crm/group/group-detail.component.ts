import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { GroupGraphQLService } from './group-graphql.service';

@Component({
    selector: 'ps-group-detail',
    templateUrl: './group-detail.component.html'
})
export class GroupDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: GroupGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }
}
