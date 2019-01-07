import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './expedient.graphql';
import { Modality } from '../forem.models';

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
    columnsSearch: string[] = ['forem_expedient.id', 'forem_expedient.name', 'forem_expedient.year'];
    displayedColumns = ['forem_expedient.id', 'forem_expedient.name', 'forem_expedient.modality_id', 'forem_expedient.year', 'actions'];
    modalities: Modality[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    getCustomArgumentsGetRecords(args: Object): Object
    {
        args['configModalities'] = {
            key: 'pulsar-forem.modalities'
        };

        return args;
    }

    setRelationsData(data: any): void
    {
        // set modalities
        this.modalities = <Modality[]>data.foremModalities;
    }
}
