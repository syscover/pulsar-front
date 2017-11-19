import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ResourceGraphQLService } from './resource-graphql.service';
import { Package } from './../admin.models';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-resource-detail',
    templateUrl: './resource-detail.component.html'
})
export class ResourceDetailComponent extends CoreDetailComponent {

    packages: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: ResourceGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: '',
            object_id: ['', Validators.required ],
            name: ['', Validators.required ],
            package_id: ['', Validators.required ]
        });
    }

    setRelationsData(data: any) {
        // set packages
        this.packages = _.map(<Package[]>data['adminPackages'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.packages.unshift({ label: 'Select a package', value: '' });
    }
}
