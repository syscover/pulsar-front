import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ResourceGraphQLService } from './resource-graphql.service';
import { Package } from './../admin.models';

@Component({
    selector: 'dh2-resource-detail',
    templateUrl: 'resource-detail.component.html',
    animations: fuseAnimations
})
export class ResourceDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'APPS.RESOURCE';
    objectTranslationGender = 'M';
    packages: Package[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: ResourceGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: null,
            id: [null, Validators.required],
            name: [null, Validators.required],
            package_id: [null, Validators.required]
        });
    }

    setRelationsData(data: any): void
    {
        // admin packages
        this.packages = data.adminPackages;
    }
}
