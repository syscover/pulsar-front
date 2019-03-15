import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './province.graphql';

@Component({
    selector: 'dh2-forem-province-list',
    templateUrl: './province-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class ProvinceListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.PROVINCE';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['forem_province.id', 'forem_province.code', 'forem_province.name'];
    displayedColumns = ['forem_province.id', 'forem_province.code', 'forem_province.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
