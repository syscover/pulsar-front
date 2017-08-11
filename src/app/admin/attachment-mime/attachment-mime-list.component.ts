import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { AttachmentMimeGraphQLService } from './attachment-mime-graphql.service';

@Component({
    selector: 'ps-attachment-mime-list',
    templateUrl: './attachment-mime-list.component.html'
})
export class AttachmentMimeListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'admin_attachment_mime.id', 'admin_resource.name', 'admin_attachment_mime.mime'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentMimeGraphQLService
    ) {
        super(injector, graphQL);
    }
}
