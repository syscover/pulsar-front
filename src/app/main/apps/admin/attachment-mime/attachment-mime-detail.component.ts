import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { AttachmentMimeGraphQLService } from './attachment-mime-graphql.service';
import { Resource } from './../admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-attachment-mime-detail',
    templateUrl: 'attachment-mime-detail.component.html',
    animations: fuseAnimations
})
export class AttachmentMimeDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.ATTACHMENT_MIME';
    objectTranslationGender = 'M';
    resources: Resource[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentMimeGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            resource_id: [null, Validators.required],
            mime: [null, Validators.required]
        });
    }

    argumentsRelationsObject(): Object
    {
        return {
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
    }
}
