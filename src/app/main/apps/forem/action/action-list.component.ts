import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './action.graphql';

@Component({
    selector: 'dh2-forem-action-list',
    templateUrl: './action-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class ActionListComponent extends CoreListComponent
{
    objectTranslation = 'FOREM.ACTION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['forem_action.id', 'forem_action.code', 'forem_action.name'];
    displayedColumns = ['forem_action.id', 'forem_action.code', 'forem_action.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
