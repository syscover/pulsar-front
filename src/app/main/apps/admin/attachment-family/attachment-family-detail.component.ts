import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { graphQL } from './attachment-family.graphql';
import { Resource } from '../admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-admin-attachment-family-detail',
    templateUrl: 'attachment-family-detail.component.html',
    animations: fuseAnimations
})
export class AttachmentFamilyDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'ADMIN.ATTACHMENT_FAMILY';
    objectTranslationGender = 'F';
    resources: Resource[] = [];
    sizes: any[] = [];
    formats: any[] = [
        { id: 'jpg', name: 'jpg' },
        { id: 'png', name: 'png' },
        { id: 'gif', name: 'gif' },
        { id: 'tif', name: 'tif' },
        { id: 'bmp', name: 'bmp' },
        { id: 'data-url', name: 'data-url' }
    ];

    constructor(
        private _injector: Injector
    ) {
        super(_injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            resource_id: ['', Validators.required],
            name: ['', Validators.required],
            width: '',
            height: '',
            sizes: '',
            quality: '',
            format: [[]]
        });
    }

    argumentsRelationsObject(): object
    {
        return {
            configSizes : {
                key: 'pulsar-admin.sizes'
            },
            configAttachmentResources : {
                key: 'pulsar-admin.attachment_resources'
            }
        };
    }

    setRelationsData(data: any): void
    {
        // admin resources
        const resourcesAllowed = data.configAttachmentResources;
        this.resources = _.filter(<Resource[]>data.adminResources, obj => {
            return _.find(resourcesAllowed, {id: obj.id}) ? true : false;
        });

        // set sizes
        this.sizes = data['configSizes'];
    }
}
