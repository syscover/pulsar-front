import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './file.graphql';
import faker from 'faker';

@Component({
    selector: 'dh2-peci-file-list',
    templateUrl: './file-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class FileListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.ACTION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['admin_action.id', 'admin_action.name'];
    displayedColumns = ['admin_action.id', 'admin_action.name', 'admin_action.process', 'actions'];

    faker = faker;

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
