import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { ProfileGraphQLService } from './profile-graphql.service';

@Component({
    selector: 'app-profile-list',
    templateUrl: './profile-list.component.html'
})
export class ProfileListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected grahpQL: ProfileGraphQLService
    ) {
        super(injector, grahpQL);
    }
}
