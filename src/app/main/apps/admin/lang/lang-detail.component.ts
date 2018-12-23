import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './lang.graphql';

@Component({
    selector: 'dh2-admin-lang-detail',
    templateUrl: './lang-detail.component.html',
    animations: fuseAnimations
})
export class LangDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.LANGUAGE';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: ['', [ Validators.required, Validators.minLength(2), Validators.maxLength(2)]],
            name: ['', Validators.required],
            icon: '',
            sort: '',
            active: false
        });
    }
}
