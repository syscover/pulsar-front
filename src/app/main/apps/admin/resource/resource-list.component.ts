import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './resource.graphql';

@Component({
    selector: 'dh2-admin-resource-list',
    templateUrl: './resource-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class ResourceListComponent extends CoreListComponent 
{
    objectTranslation = 'APPS.RESOURCE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_resource.id', 'admin_resource.name', 'admin_package.name'];
    displayedColumns = ['admin_resource.id', 'admin_resource.name', 'admin_package.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
