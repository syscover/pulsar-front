import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { FamilyGraphQLService } from './family-graphql.service';
import { FieldGroup } from './../../admin/admin.models';
import { Editor } from './../cms.models';
import * as _ from 'lodash';

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
        protected injector: Injector,
        protected graphQL: FamilyGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required ],
            date: false,
            title: false,
            slug: false,
            categories: false,
            sort: false,
            tags: false,
            link: false,
            article_parent: false,
            attachments: false,
            excerpt_editor_id: null,
            article_editor_id: null,
            field_group_id: null
        });
    }

    argumentsRelationsObject() 
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

    setRelationsData(data: any) 
    {
        // set article and excerpt editors
        this.editors = <Editor[]>data.coreConfig;

        // set fieldsGroups
        this.fieldGroups = <FieldGroup[]>data.adminFieldGroups;
    }
}

