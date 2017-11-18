import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { AttachmentMimeGraphQLService } from './attachment-mime-graphql.service';
import { Resource } from './../admin.models';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-attachment-mime-detail',
    templateUrl: './attachment-mime-detail.component.html'
})
export class AttachmentMimeDetailComponent extends CoreDetailComponent {

    resources: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: AttachmentMimeGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            resource_id: ['', Validators.required ],
            mime: ['', Validators.required ]
        });
    }

    argumentsRelationsObject(): Object {
        return {
            configAttachmentResources : {
                key: 'pulsar-admin.attachment_resources'
            }
        };
    }

    setRelationsData(data: any) {

        // get resources allowed to add attachment mime
        const resourcesAllowed = data.configAttachmentResources;
        let resources = _.filter(<Resource[]>data.adminResources, obj => {
            return _.find(resourcesAllowed, ['id', obj.id]) ? true : false;
        });

        // map resources to create SelectItem
        this.resources = _.map(<Resource[]>resources, obj => { // get resources
            return { value: obj.id, label: obj.name };
        });
        this.resources.unshift({ label: 'Select a resource', value: '' });
    }
}
