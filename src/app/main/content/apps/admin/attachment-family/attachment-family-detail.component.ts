import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { AttachmentFamilyGraphQLService } from './attachment-family-graphql.service';
import { Resource } from './../admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-attachment-family-detail',
    templateUrl: 'attachment-family-detail.component.html',
    animations: fuseAnimations
})
export class AttachmentFamilyDetailComponent extends CoreDetailComponent 
{
    objectTranslation = 'APPS.FIELD_GROUP';
    objectTranslationGender = 'M';
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
        protected injector: Injector,
        protected graphQL: AttachmentFamilyGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            resource_id: [null, Validators.required],
            name: [null, Validators.required],
            width: null,
            height: null,
            sizes: null,
            quality: null,
            format: []
        });
    }

    argumentsRelationsObject(): Object 
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

    setRelationsData(data: any) 
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
