import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './wine.graphql';

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
    displayedColumns = ['wine_wine.id', 'wine_wine.name', 'wine_wine.year', 'translations', 'actions'];
    filters = [
        {'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }
    ];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
