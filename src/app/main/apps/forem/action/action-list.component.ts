import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './action.graphql';
import { Type, Assistance } from './../forem.models';

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
    displayedColumns = ['forem_action.id', 'forem_action.code', 'forem_action.name', 'forem_action.type_id', 'forem_action.assistance_id', 'actions'];
    types: Type[] = [];
    assistances: Assistance[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    getCustomArgumentsGetRecords(args: object): object
    {
        args['configAssistances'] = {
            key: 'pulsar-forem.assistances'
        };

        args['configTypes'] = {
            key: 'pulsar-forem.types'
        };

        return args;
    }

    setRelationsData(data: any): void
    {
        this.types = data.foremTypes;
        this.assistances = data.foremAssistances;
    }
}
