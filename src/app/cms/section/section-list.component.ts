import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { SectionGraphQLService } from './section-graphql.service';

@Component({
    selector: 'ps-section-list',
    templateUrl: './section-list.component.html'
})
export class SectionListComponent extends CoreListComponent {

    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'section.id', 'section.name', 'article_family.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: SectionGraphQLService
    ) {
        super(injector, graphQL);
    }
}
