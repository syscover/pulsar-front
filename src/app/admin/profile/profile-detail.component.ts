import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ProfileGraphQLService } from './profile-graphql.service';

@Component({
    selector: 'ps-profile-detail',
    templateUrl: 'profile-detail.component.html'
})
export class ProfileDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: ProfileGraphQLService
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
