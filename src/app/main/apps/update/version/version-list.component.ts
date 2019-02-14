import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './version.graphql';

@Component({
    selector: 'dh2-update-version-list',
    templateUrl: './version-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class VersionListComponent extends CoreListComponent
{
    objectTranslation = 'UPDATE.VERSION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['update_versions.id', 'update_versions.name', 'admin_package.name', 'update_versions.version'];
    displayedColumns = ['update_versions.id', 'update_versions.name', 'admin_package.name', 'update_versions.migration', 'update_versions.config', 'update_versions.version', 'update_versions.publish', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
