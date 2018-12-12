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
    columnsSearch: string[] = ['wine_wine.id', 'wine_wine_lang.name', 'wine_wine.vintage'];
    displayedColumns = ['wine_wine.id', 'wine_wine_lang.name', 'wine_wine.vintage', 'translations', 'actions'];
    filters = [
        {'command': 'where', 'column': 'wine_wine_lang.lang_id', 'operator': '=', 'value': this.baseLang }
    ];

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}
