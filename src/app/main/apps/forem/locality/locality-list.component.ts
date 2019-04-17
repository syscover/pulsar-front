import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './locality.graphql';

@Component({
    selector: 'dh2-forem-locality-list',
    templateUrl: './locality-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class LocalityListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.LOCALITY';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['forem_locality.id', 'forem_locality.code', 'forem_province.name', 'forem_locality.name'];
    displayedColumns = ['forem_locality.id', 'forem_locality.code', 'forem_province.name', 'forem_locality.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
