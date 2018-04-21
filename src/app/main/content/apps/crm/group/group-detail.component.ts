import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { GroupGraphQLService } from './group-graphql.service';

@Component({
    selector: 'dh2-group-detail',
    templateUrl: 'group-detail.component.html',
    animations: fuseAnimations
})
export class GroupDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'CRM.GROUP';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: GroupGraphQLService
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

