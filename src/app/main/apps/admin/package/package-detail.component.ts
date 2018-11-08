import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './package.graphql';

@Component({
    selector: 'dh2-package-detail',
    templateUrl: 'package-detail.component.html',
    animations: fuseAnimations
})
export class PackageDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'ADMIN.PACKAGE';
    objectTranslationGender = 'M';

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            root: [null, Validators.required],
            active: false,
            sort: [null, Validators.required]
        });
    }
}

