import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './wine.graphql';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-wine-list',
    templateUrl: './wine-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class WineListComponent extends CoreListComponent
{
    public _ = _;
    public objectTranslation = 'WINE.WINE';
    public objectTranslationGender = 'M';
    public columnsSearch: string[] = ['wine_wine.id', 'wine_wine_lang.name', 'wine_wine.vintage'];
    public displayedColumns = ['wine_wine.id', 'wine_wine_lang.name', 'wine_wine.vintage', 'wine_wine.price', 'wine_wine.stock', 'translations', 'actions'];
    public filters = [
        {'command': 'where', 'column': 'wine_wine_lang.lang_id', 'operator': '=', 'value': this.baseLang }
    ];

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}
