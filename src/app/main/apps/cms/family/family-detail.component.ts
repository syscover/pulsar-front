import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/foundations/core-detail-compoment';
import { FieldGroup } from '../../admin/admin.models';
import { Editor } from '../cms.models';
import { graphQL } from './family.graphql';

@Component({
    selector: 'dh2-family-detail',
    templateUrl: './family-detail.component.html',
    animations: fuseAnimations
})
export class FamilyDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'CMS.FAMILY';
    objectTranslationGender = 'F';
    editors: Editor[] = [];
    fieldGroups: FieldGroup[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            date: false,
            title: false,
            slug: false,
            categories: false,
            sort: false,
            tags: false,
            link: false,
            article_parent: false,
            attachments: false,
            excerpt_editor_id: '',
            article_editor_id: '',
            field_group_id: ''
        });
    }

    argumentsRelationsObject(): object
    {
        const sqlFieldGroup = [
            {
                command: 'where',
                column: 'resource_id',
                operator: '=',
                value: 'cms-article-family'
            },
            {
                command: 'orderBy',
                operator: 'asc',
                column: 'admin_field_group.name'
            }
        ];

        const configEditors = {
            key: 'pulsar-cms.editors'
        };

        return {
            configEditors,
            sqlFieldGroup
        };
    }

    setRelationsData(data: any): void
    {
        // set article and excerpt editors
        this.editors = <Editor[]>data.coreConfig;

        // set fieldsGroups
        this.fieldGroups = <FieldGroup[]>data.adminFieldGroups;
    }
}

