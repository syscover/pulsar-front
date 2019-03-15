import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './group.graphql';

@Component({
    selector: 'dh2-innova-concrete-group-list',
    templateUrl: './group-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class GroupListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.TYPE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['innova_concrete_group.id', 'innova_concrete_group.name'];
    displayedColumns = ['innova_concrete_group.id', 'innova_concrete_group.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
