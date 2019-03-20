import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './inscription.graphql';

@Component({
    selector: 'dh2-forem-inscription-list',
    templateUrl: './inscription-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class InscriptionListComponent extends CoreListComponent
{
    objectTranslation = 'FOREM.INSCRIPTION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['forem_inscription.id', 'forem_inscription.code', 'forem_inscription.name'];
    displayedColumns = ['forem_inscription.id', 'forem_inscription.code', 'forem_inscription.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
