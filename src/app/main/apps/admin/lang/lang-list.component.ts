import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './lang.graphql';

@Component({
    selector: 'dh2-admin-lang-list',
    templateUrl: './lang-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class LangListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.LANGUAGE';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['admin_lang.id', 'admin_lang.name'];
    displayedColumns = ['admin_lang.id', 'admin_lang.name', 'admin_lang.active', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
