import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './field-group.graphql';

@Component({
    selector: 'dh2-admin-field-group-list',
    templateUrl: './field-group-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class FieldGroupListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.FIELD_GROUP';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_field_group.id', 'admin_field_group.name', 'admin_resource.name'];
    displayedColumns = ['admin_field_group.id', 'admin_field_group.name', 'admin_resource.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
