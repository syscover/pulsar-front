import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { AttachmentFamilyGraphQLService } from './attachment-family-graphql.service';

@Component({
    selector: 'ps-attachment-family-list',
    templateUrl: './attachment-family-list.component.html'
})
export class AttachmentFamilyListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'attachment_family.id', 'attachment_family.name', 'resource.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentFamilyGraphQLService
    ) {
        super(injector, graphQL);
    }
}
