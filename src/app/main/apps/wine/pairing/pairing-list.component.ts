import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './pairing.graphql';

@Component({
    selector: 'dh2-wine-pairing-list',
    templateUrl: './pairing-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class PairingListComponent extends CoreListComponent
{
    objectTranslation = 'WINE.PAIRING';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['wine_pairing.id', 'wine_pairing.name'];
    displayedColumns = ['wine_pairing.id', 'wine_pairing.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}
