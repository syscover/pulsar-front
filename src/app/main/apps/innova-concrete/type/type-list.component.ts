import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './type.graphql';

@Component({
    selector: 'dh2-innova-concrete-type-list',
    templateUrl: './type-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class TypeListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.TYPE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['innova_concrete_type.id', 'innova_concrete_type.name'];
    displayedColumns = ['innova_concrete_type.id', 'innova_concrete_type.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
