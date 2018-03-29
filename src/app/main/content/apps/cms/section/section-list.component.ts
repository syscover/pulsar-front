import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { SectionGraphQLService } from './section-graphql.service';

@Component({
    selector: 'dh2-section-list',
    templateUrl: './section-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class SectionListComponent extends CoreListComponent 
{
    objectTranslation = 'APPS.SECTION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['cms_section.id', 'cms_section.name', 'cms_family.name'];
    displayedColumns = ['cms_section.id', 'cms_section.name', 'cms_family.name', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: SectionGraphQLService
    ) {
        super(injector, graphQL);
    }
}
