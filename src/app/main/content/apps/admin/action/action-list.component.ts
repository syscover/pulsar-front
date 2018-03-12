import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { fuseAnimations } from './../../../../../core/animations';
import { ActionGraphQLService } from './action-graphql.service';

@Component({
    selector: 'dh2-action-list',
    templateUrl: './action-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/core-list-component.scss']
})
export class ActionListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.ACTION';
    columnsSearch: string[] = ['id', 'name'];
    displayedColumns = ['id', 'name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: ActionGraphQLService
    ) {
        super(injector, graphQL);
    }
}
