import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { Params } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { FamilyGraphQLService } from './family-graphql.service';
import { FieldGroup } from './../../admin/admin.models';
import { Editor } from './../cms.models';

import * as _ from 'lodash';

@Component({
    selector: 'ps-family-detail',
    templateUrl: './family-detail.component.html'
})
export class FamilyDetailComponent extends CoreDetailComponent {

    editors: SelectItem[] = [];
    fieldGroups: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: FamilyGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            date: '',
            title: '',
            slug: '',
            categories: '',
            sort: '',
            tags: '',
            link: '',
            article_parent: '',
            attachments: '',
            editor_id: '',
            field_group_id: ''
        });
    }

    argumentsRelationsObject() {

        let sqlFieldGroup = [
            {
                command: 'where',
                column: 'resource_id',
                operator: '=',
                value: 'cms-article-family'
            }
        ];

        let configEditors = {
            key: 'pulsar.cms.editors'
        };

        return {
            configEditors,
            sqlFieldGroup
        };
    }

    setRelationsData(data: any) {
        // set editor
        this.editors = _.map(<Editor[]>data.coreConfig, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.editors.unshift({ label: 'Select a editor', value: '' });

        // set fieldsGroups
        this.fieldGroups = _.map(<FieldGroup[]>data.adminFieldGroups, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.fieldGroups.unshift({ label: 'Select a field group', value: '' });
    }
}
