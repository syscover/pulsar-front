import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../../core/super/core-list.component';
import { SectionGraphQLService } from './section-graphql.service';

@Component({
    selector: 'ps-section-list',
    templateUrl: './section-list.component.html'
})
export class SectionListComponent extends CoreListComponent {

    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'cms_section.id', 'cms_section.name', 'cms_family.name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: SectionGraphQLService
    ) {
        super(injector, graphQL);
    }
}
