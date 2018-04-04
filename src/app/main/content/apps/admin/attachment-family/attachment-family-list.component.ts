import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { AttachmentFamilyGraphQLService } from './attachment-family-graphql.service';

@Component({
    selector: 'dh2-attachment-family-list',
    templateUrl: './attachment-family-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class AttachmentFamilyListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.ATTACHMENT_FAMILY';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_attachment_family.id', 'admin_attachment_family.name', 'admin_resource.name'];
    displayedColumns = ['admin_attachment_family.id', 'admin_attachment_family.name', 'admin_resource.name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentFamilyGraphQLService
    ) {
        super(injector, graphQL);
    }
}
