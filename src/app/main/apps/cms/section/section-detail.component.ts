import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { Family } from '../cms.models';
import { AttachmentFamily } from '../../admin/admin.models';
import { graphQL } from './section.graphql';

@Component({
    selector: 'dh2-section-detail',
    templateUrl: './section-detail.component.html',
    animations: fuseAnimations
})
export class SectionDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'CMS.SECTION';
    objectTranslationGender = 'F';
    families: Family[] = [];
    attachmentFamilies: AttachmentFamily[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: ['', [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(30)]
            ],
            name: ['', Validators.required ],
            family_id: '',
            attachment_families: ''
        });
    }

    argumentsRelationsObject(): Object
    {
        const sqlAttachmentFamily = [
            {
                command: 'where',
                column: 'admin_attachment_family.resource_id',
                operator: '=',
                value: 'cms-article'
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_attachment_family.name'
            }
        ];

        return {
            sqlAttachmentFamily
        };
    }

    beforePatchValueEdit(): void
    {
        if (this.object.attachment_families)
        {
            const object = Object.assign({}, this.object);
            object.attachment_families = object.attachment_families.map((item) => +item);
            this.object = object;
        }
    }

    setRelationsData(data: any): void
    {
        // cms families
        this.families = data.cmsFamilies;

        // admin attachmentFamilies
        this.attachmentFamilies = data.adminAttachmentFamilies;
    }
}
