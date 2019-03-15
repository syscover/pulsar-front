import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { graphQL } from './group.graphql';

@Component({
    selector: 'dh2-innova-concrete-group-detail',
    templateUrl: 'group-detail.component.html',
    animations: fuseAnimations
})
export class GroupDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'APPS.GROUP';
    objectTranslationGender = 'M';
    loadingSlug = false;

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
