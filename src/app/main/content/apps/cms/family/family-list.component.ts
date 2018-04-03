import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { FamilyGraphQLService } from './family-graphql.service';

@Component({
    selector: 'dh2-family-list',
    templateUrl: './family-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class FamilyListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.FAMILY';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['id', 'name'];
    displayedColumns = ['id', 'name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: FamilyGraphQLService
    ) {
        super(injector, graphQL);
    }
}
