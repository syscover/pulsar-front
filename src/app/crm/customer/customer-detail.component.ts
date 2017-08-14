import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CustomerGraphQLService } from './customer-graphql.service';
import { Group } from './../crm.models';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-customer-detail',
    templateUrl: './customer-detail.component.html'
})
export class CustomerDetailComponent extends CoreDetailComponent {

    groups: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: CustomerGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [null, Validators.required],
            group_id: ['', Validators.required],
            name: null,
            surname: null,
            address: null,
            email: [null, Validators.required],
            user: [null, Validators.required],
            password: null,
            re_password: null,
            active: null
        });
    }

    setRelationsData(data: any) {
        // set groups
        this.groups = _.map(<Group[]>data['crmGroups'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.groups.unshift({ label: 'Select a group', value: '' });
    }
}