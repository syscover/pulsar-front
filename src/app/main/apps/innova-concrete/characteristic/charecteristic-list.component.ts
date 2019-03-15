import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './characteristic.graphql';

@Component({
    selector: 'dh2-innova-concrete-characteristic-list',
    templateUrl: './innova-concrete-characteristic-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class CharecteristicListComponent extends CoreListComponent
{
    objectTranslation = 'CRM.ADDRESS_TYPE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['crm_address_type.id', 'crm_address_type.name'];
    displayedColumns = ['crm_address_type.id', 'crm_address_type.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
