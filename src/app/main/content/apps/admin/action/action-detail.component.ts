import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ActionGraphQLService } from './action-graphql.service';

@Component({
    selector: 'dh2-action-detail',
    templateUrl: './action-detail.component.html',
    animations: fuseAnimations
})
export class ActionDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.ACTION';
    objectTranslationGender = 'F';

    constructor(
        protected injector: Injector,
        protected graphQL: ActionGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            ix: null,
            id: [null, [Validators.required, Validators.minLength(2)]],
            name: [null, Validators.required]
        });
    }
}
