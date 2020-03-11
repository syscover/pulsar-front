import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { Rating } from './../forem.models';
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
    displayedColumns = ['forem_trainer.id', 'forem_trainer.name', 'forem_trainer.surname', 'forem_trainer.tin', 'forem_trainer.profile', 'forem_trainer.rating_id', 'actions'];
    ratings: Rating[] = [];

    constructor(
        protected injector: Injector
    ) 
    {
        super(injector, graphQL);
    }

    // overwrite method to get statuses
    getCustomArgumentsGetRecords(args: object): object
    {    
        args['configRatings'] = {
            key: 'pulsar-forem.ratings'
        };

        return args;
    }

    setRelationsData(data: any): void 
    {
        this.ratings = data.foremRatings;
    }
}
