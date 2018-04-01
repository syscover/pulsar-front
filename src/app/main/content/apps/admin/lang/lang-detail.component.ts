import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { LangGraphQLService } from './lang-graphql.service';

@Component({
    selector: 'dh2-lang-detail',
    templateUrl: './lang-detail.component.html',
    animations: fuseAnimations
})
export class LangDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.LANGUAGE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector,
        protected graphQL: LangGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            ix: null,
            id: [null, [ Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            name: [null, Validators.required],
            icon: null,
            sort: null,
            active: false
        });
    }
}
