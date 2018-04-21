
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { GroupGraphQLService } from './group-graphql.service';

@Component({
    selector: 'dh2-group-list',
    templateUrl: './group-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class GroupListComponent extends CoreListComponent 
{
    objectTranslation = 'CRM.GROUP';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['crm_group.id', 'crm_group.name'];
    displayedColumns = ['crm_group.id', 'crm_group.name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: GroupGraphQLService
    ) {
        super(injector, graphQL);
    }
}
