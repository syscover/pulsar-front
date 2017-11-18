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

    argumentsRelationsObject(): Object {
        return {
            configSizes : {
                key: 'pulsar-admin.sizes'
            },
            configAttachmentResources : {
                key: 'pulsar-admin.attachment_resources'
            }
        };
    }

    setRelationsData(data: any) {
        // get resources allowed to add custom field group
        const resourcesAllowed = data.configAttachmentResources;
        let resources = _.filter(<Resource[]>data.adminResources, obj => {
            return _.find(resourcesAllowed, ['id', obj.id]) ? true : false;
        });

        // map resources to create SelectItem
        this.resources = _.map(<Resource[]>resources, obj => { // get resources
            return { value: obj.id, label: obj.name };
        });
        this.resources.unshift({ label: 'Select a resource', value: '' });

        // set sizes
        this.sizes = _.map(<any[]>data['configSizes'], obj => {
            return { value: obj.id, label: obj.name };
        });
    }
}
