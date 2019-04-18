import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './presentation.graphql';

@Component({
    selector: 'dh2-wine-presentation-list',
    templateUrl: './presentation-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class PresentationListComponent extends CoreListComponent
{
    objectTranslation = 'WINE.PRESENTATION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['wine_presentation.id', 'wine_presentation.name'];
    displayedColumns = ['wine_presentation.id', 'wine_presentation.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang.id }];

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}
