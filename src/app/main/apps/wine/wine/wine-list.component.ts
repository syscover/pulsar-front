import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { WineGraphqlService } from './wine-graphql.service';

@Component({
    selector: 'dh2-wine-list',
    templateUrl: './wine-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class WineListComponent extends CoreListComponent
{
    objectTranslation = 'WINE.WINE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['wine_wine.id', 'wine_wine.name', 'wine_wine.year'];
    displayedColumns = ['wine_wine.id', 'wine_wine.name', 'wine_wine.year', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: WineGraphqlService
    ) {
        super(injector, graphQL);
    }
}
