import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { AddressTypeGraphQLService } from './address-type-graphql.service';

@Component({
    selector: 'dh2-address-type-detail',
    templateUrl: 'address-type-detail.component.html',
    animations: fuseAnimations
})
export class AddressTypeDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'CRM.ADDRESS_TYPE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: AddressTypeGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required]
        });
    }
}

