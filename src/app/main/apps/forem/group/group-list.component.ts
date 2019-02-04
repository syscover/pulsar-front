import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './group.graphql';

@Component({
    selector: 'dh2-forem-group-list',
    templateUrl: './group-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class GroupListComponent extends CoreListComponent
{
    objectTranslation = 'FOREM.GROUP';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['forem_group.id', 'forem_group.code', 'forem_group.name', 'forem_group.price', 'forem_group.publish', 'forem_group.featured'];
    displayedColumns = ['forem_group.id', 'forem_group.code', 'forem_group.name', 'forem_group.price', 'forem_group.publish', 'forem_group.featured', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
