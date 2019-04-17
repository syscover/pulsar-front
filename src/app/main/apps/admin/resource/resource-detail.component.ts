import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { graphQL } from './resource.graphql';
import { Package } from '../admin.models';

@Component({
    selector: 'dh2-admin-resource-detail',
    templateUrl: 'resource-detail.component.html',
    animations: fuseAnimations
})
export class ResourceDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'APPS.RESOURCE';
    objectTranslationGender = 'M';
    packages: Package[] = [];

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: ['', Validators.required],
            name: ['', Validators.required],
            package_id: ['', Validators.required]
        });
    }

    setRelationsData(data: any): void
    {
        // admin packages
        this.packages = data.adminPackages;
    }
}
