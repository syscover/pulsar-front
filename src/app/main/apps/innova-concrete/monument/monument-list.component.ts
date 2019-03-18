import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './monument.graphql';

@Component({
    selector: 'dh2-innova-concrete-monument-list',
    templateUrl: './monument-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class MonumentListComponent extends CoreListComponent
{
    objectTranslation = 'INNOVA.MONUMENT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['innova_concrete_monument.id', 'innova_concrete_monument.current_name'];
    displayedColumns = ['innova_concrete_monument.id', 'innova_concrete_monument.current_name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
