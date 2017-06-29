import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { AttachmentFamilyGraphQLService } from './attachment-family-graphql.service';

@Component({
    selector: 'ps-attachment-family-list',
    templateUrl: './attachment-family-list.component.html'
})
export class AttachmentFamilyListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentFamilyGraphQLService
    ) {
        super(injector, graphQL);
    }
}
