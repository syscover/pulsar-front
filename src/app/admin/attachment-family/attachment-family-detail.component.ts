import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { AttachmentFamilyGraphQLService } from './attachment-family-graphql.service';
import { Resource } from './../admin.models';
import { SelectItem } from 'primeng/primeng';

import * as _ from 'lodash';

@Component({
    selector: 'ps-attachment-family-detail',
    templateUrl: './attachment-family-detail.component.html'
})
export class AttachmentFamilyDetailComponent extends CoreDetailComponent {

    resources: SelectItem[] = [];
    sizes: SelectItem[] = [];
    formats: SelectItem[] = [
        { label: 'Select a format image', value: '' },
        { value: 'jpg', label: 'jpg' },
        { value: 'png', label: 'png' },
        { value: 'gif', label: 'gif' },
        { value: 'tif', label: 'tif' },
        { value: 'bmp', label: 'bmp' },
        { value: 'data-url', label: 'data-url' }
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentFamilyGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            resource_id: ['', Validators.required ],
            name: ['', Validators.required ],
            width: null,
            height: null,
            sizes: null,
            quality: null,
            format: ''
        });
    }

    // ovewrite this method to custom column id by column attachment_family.id
    getArgsToGetRecord(params: Params) {
        let args = {
            sql: [{
                command: 'where',
                column: 'attachment_family.id',
                operator: '=',
                value: params['id']
            }]
        };

        return args;
    }

    getDataRelationsObjectGraphQL() {
        this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.grahpQL.queryRelationsObject,
                variables: {
                    config: {
                        key: 'pulsar.admin.sizes'
                    }
                }
            })
            .subscribe(({data}) => {
                this.setDataRelationsObject(data);
            });
    }

    setDataRelationsObject(data: any) {
        // set resources
        this.resources = _.map(<Resource[]>data['adminResources'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.resources.unshift({ label: 'Select a resource', value: '' });

        // set sizes
        this.sizes = _.map(<any[]>data['adminSizes'], obj => {
            return { value: obj.id, label: obj.name };
        });
    }
}
