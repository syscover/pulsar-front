import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './expedient.graphql';

@Component({
    selector: 'dh2-forem-expedient-list',
    templateUrl: './expedient-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class ExpedientListComponent extends CoreListComponent
{
    objectTranslation = 'FOREM.EXPEDIENT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['forem_expedient.id', 'forem_expedient.code', 'forem_expedient.name', 'forem_expedient.year'];
    displayedColumns = ['forem_expedient.id', 'forem_expedient.code', 'forem_expedient.name', 'forem_expedient.year', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
