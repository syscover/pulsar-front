import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './attachment-family.graphql';

@Component({
    selector: 'dh2-admin-attachment-family-list',
    templateUrl: './attachment-family-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class AttachmentFamilyListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.ATTACHMENT_FAMILY';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['admin_attachment_family.id', 'admin_attachment_family.name', 'admin_resource.name', 'admin_attachment_family.width', 'admin_attachment_family.height'];
    displayedColumns = ['admin_attachment_family.id', 'admin_attachment_family.name', 'admin_resource.name', 'admin_attachment_family.width', 'admin_attachment_family.height', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
