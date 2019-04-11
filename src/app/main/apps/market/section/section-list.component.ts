import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './section.graphql';

@Component({
    selector: 'dh2-market-section-list',
    templateUrl: './section-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class SectionListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.SECTION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['market_section.id', 'market_section.name'];
    displayedColumns = ['market_section.id', 'market_section.name', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
