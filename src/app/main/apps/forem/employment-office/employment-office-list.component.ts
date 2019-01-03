import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './employment-office.graphql';

@Component({
    selector: 'dh2-forem-employment-office-list',
    templateUrl: './employment-office-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class EmploymentOfficeListComponent extends CoreListComponent
{
    objectTranslation = 'FOREM.EMPLOYMENT_OFFICE';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['forem_employment_office.id', 'forem_employment_office.code', 'forem_employment_office.name', 'admin_profile.name'];
    displayedColumns = ['forem_employment_office.id', 'forem_employment_office.code', 'forem_employment_office.name', 'admin_profile.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
