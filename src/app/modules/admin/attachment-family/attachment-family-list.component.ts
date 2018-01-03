import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { AttachmentFamilyGraphQLService } from './attachment-family-graphql.service';

@Component({
    selector: 'ps-attachment-family-list',
    templateUrl: './attachment-family-list.component.html'
})
export class AttachmentFamilyListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'admin_attachment_family.id', 'admin_attachment_family.name', 'admin_resource.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentFamilyGraphQLService
    ) {
        super(injector, graphQL);
    }
}
