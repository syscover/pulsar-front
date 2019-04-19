import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './monument.graphql';

@Component({
    selector: 'dh2-innova-concrete-monument-list',
    templateUrl: './monument-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
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

    // overwrite method to get statuses
    getCustomArgumentsGetRecords(args: object): object
    {
        args['sql'].push({
            command: 'orderBy',
            operator: 'desc',
            column: 'innova_concrete_monument.id'
        });

        return args;
    }
}
