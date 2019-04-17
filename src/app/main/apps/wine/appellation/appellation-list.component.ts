import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './appellation.graphql';

@Component({
    selector: 'dh2-wine-appellation-list',
    templateUrl: './appellation-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class AppellationListComponent extends CoreListComponent
{
    objectTranslation = 'WINE.APPELLATION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['wine_appellation.id', 'wine_appellation.name'];
    displayedColumns = ['wine_appellation.id', 'wine_appellation.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}
