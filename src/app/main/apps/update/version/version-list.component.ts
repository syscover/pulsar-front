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
    displayedColumns = ['update_version.id', 'update_version.name', 'admin_package.name', 'update_version.provide', 'update_version.provide_from', 'update_version.composer', 'update_version.migration', 'update_version.version', 'update_version.minimal_panel_version', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
