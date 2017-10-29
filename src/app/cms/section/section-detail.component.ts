import { AttachmentFamily } from './../../admin/admin.models';
import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { SectionGraphQLService } from './section-graphql.service';
import { SelectItem } from 'primeng/primeng';
import { Family } from './../cms.models';

import * as _ from 'lodash';

@Component({
    selector: 'ps-section-detail',
    templateUrl: './section-detail.component.html'
})
export class SectionDetailComponent extends CoreDetailComponent {

    families: SelectItem[] = [];
    attachmentFamilies: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: SectionGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(30)]
            ],
            name: ['', Validators.required ],
            family_id: null,
            attachment_families: null
        });
    }

    argumentsRelationsObject() {

        let sqlAttachmentFamily = [
            {
                command: 'where',
                column: 'resource_id',
                operator: '=',
                value: 'cms-article'
            }
        ];

        return {
            sqlAttachmentFamily
        };
    }

    setRelationsData(data: any) {
        this.families = _.map(<Family[]>data['cmsFamilies'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.families.unshift({ label: 'Select a family', value: '' });

        // set attachmentFamilies
        this.attachmentFamilies = _.map(<AttachmentFamily[]>data.adminAttachmentFamilies, obj => {
            return { value: obj.id, label: obj.name };
        });
    }
}


