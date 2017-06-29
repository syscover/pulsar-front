import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { FieldGroupGraphQLService } from './field-group-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { Resource } from './../admin.models';

import * as _ from 'lodash';

@Component({
    selector: 'ps-field-group-detail',
    templateUrl: 'field-group-detail.component.html'
})
export class FieldGroupDetailComponent extends CoreDetailComponent {

    resources: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected grahpQL: FieldGroupGraphQLService
    ) {
        super(injector, grahpQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            resource_id: ['', Validators.required ]
        });
    }

    getArgsToGetRecord(params: Params) {
        return {
            key: 'pulsar.admin.resources_custom_fields',
            sql: [{
                command: 'where',
                column: 'field_group.id',
                operator: '=',
                value: params['id']
            }]
        };
    }

    // to create a new object, do all queries to get data across GraphQL
    getDataRelationsObjectGraphQL() {
        this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.grahpQL.queryRelationsObject,
                variables: {
                    key: 'pulsar.admin.resources_custom_fields'
                }
            })
            .subscribe(({data}) => {
                this.setDataRelationsObject(data);
            });
    }

    setDataRelationsObject(data: any) {
        // get resources allowed to add custom field group
        const resourcesAllowed = data.coreConfig;
        let resources = _.filter(<Resource[]>data.adminResources, obj => {
            return _.find(resourcesAllowed, ['id', obj.id]);
        });

        // map resources to create SelectItem
        this.resources = _.map(<Resource[]>resources, obj => { // get resources
            return { value: obj.id, label: obj.name };
        });
        this.resources.unshift({ label: 'Select a resource', value: '' });
    }
}
