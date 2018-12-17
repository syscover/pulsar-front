import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './family.graphql';

@Component({
    selector: 'dh2-family-list',
    templateUrl: './family-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class FamilyListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.FAMILY';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['cms_family.id', 'cms_family.name'];
    displayedColumns = ['cms_family.id', 'cms_family.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
