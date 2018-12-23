import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './address-type.graphql';

@Component({
    selector: 'dh2-crm-address-type-detail',
    templateUrl: 'address-type-detail.component.html',
    animations: fuseAnimations
})
export class AddressTypeDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'CRM.ADDRESS_TYPE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required]
        });
    }
}

