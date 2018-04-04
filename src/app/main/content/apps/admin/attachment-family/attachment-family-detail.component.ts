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
    objectTranslation = 'ADMIN.FIELD_GROUP';
    objectTranslationGender = 'M';
    resources: Resource[] = [];

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
            name: [null, Validators.required],
            resource_id: [null, Validators.required]
        });
    }

    argumentsRelationsObject(): Object 
    {
        return {
            configFieldGroupResources : {
                key: 'pulsar-admin.field_group_resources'
            }
        };
    }

    setRelationsData(data: any) 
    {
        // admin resources
        const resourcesAllowed = data.configFieldGroupResources;
        this.resources = _.filter(<Resource[]>data.adminResources, obj => {
            return _.find(resourcesAllowed, {id: obj.id}) ? true : false;
        });
    }
}
