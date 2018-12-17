import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './address-type.graphql';

@Component({
    selector: 'dh2-crm-address-type-list',
    templateUrl: './address-type-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class AddressTypeListComponent extends CoreListComponent 
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
