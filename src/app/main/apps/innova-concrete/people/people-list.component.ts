import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './people.graphql';

@Component({
    selector: 'dh2-innova-concrete-people-list',
    templateUrl: './people-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class PeopleListComponent extends CoreListComponent
{
    objectTranslation = 'INNOVA.PERSON';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['innova_concrete_person.id', 'innova_concrete_person.name', 'innova_concrete_group.name'];
    displayedColumns = ['innova_concrete_person.id', 'innova_concrete_person.name', 'innova_concrete_group.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
