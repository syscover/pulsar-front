import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './attachment-mime.graphql';

@Component({
    selector: 'dh2-admin-attachment-mime-list',
    templateUrl: './attachment-mime-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class AttachmentMimeListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.ATTACHMENT_MIME';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_attachment_mime.id', 'admin_attachment_mime.mime', 'admin_resource.name'];
    displayedColumns = ['admin_attachment_mime.id', 'admin_attachment_mime.mime', 'admin_resource.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
