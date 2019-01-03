import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './award.graphql';

@Component({
    selector: 'dh2-wine-award-list',
    templateUrl: './award-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class AwardListComponent extends CoreListComponent
{
    objectTranslation = 'WINE.AWARD';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['wine_award.id', 'wine_award.name'];
    displayedColumns = ['wine_award.id', 'wine_award.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected _injector: Injector
    ) {
        super(_injector, graphQL);
    }
}
