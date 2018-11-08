import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './winery.graphql';

@Component({
    selector: 'dh2-winery-list',
    templateUrl: './winery-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class WineryListComponent extends CoreListComponent
{
    objectTranslation = 'WINE.WINERY';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['wine_winery.id', 'wine_winery.name'];
    displayedColumns = ['wine_winery.id', 'wine_winery.name', 'translations', 'actions'];
    filters = [
        {'command': 'where', 'column': 'wine_winery_lang.lang_id', 'operator': '=', 'value': this.baseLang }
    ];

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}
