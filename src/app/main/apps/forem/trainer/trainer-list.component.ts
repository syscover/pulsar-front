import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './trainer.graphql';

@Component({
    selector: 'dh2-forem-trainer-list',
    templateUrl: './trainer-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class TrainerListComponent extends CoreListComponent
{
    objectTranslation = 'FOREM.TRAINER';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['forem_trainer.id', 'forem_trainer.name'];
    displayedColumns = ['forem_trainer.id', 'forem_trainer.name', 'actions'];

    constructor(
        protected injector: Injector
    ) 
    {
        super(injector, graphQL);
    }
}
