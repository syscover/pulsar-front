import { FieldGroup } from './../../admin/admin.models';
import { Component, Injector } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { Editor } from './../cms.models';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { FamilyService } from './family.service';
import { FieldGroupService } from './../../admin/field-group/field-group.service';
import { FamilyGraphQL } from './family.graphql';

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
        protected objectService: FamilyService,
        protected graphQL: FamilyGraphQL,
        protected fieldGroupService: FieldGroupService
    ) {
        super(injector, objectService);
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

    getArgsToGetRecord(params: Params) {
        return {
            key: 'pulsar.cms.editors',
            sql: [{
                command: 'where',
                column: 'id',
                operator: '=',
                value: params['id']
            }]
        };
    }

    // to create a new object, do all queries to get data across GraphQL
    getDataRelationsObjectGraphQL() {
        this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.grahpQL.queryRelationsObject,
                variables: {
                    key: 'pulsar.cms.editors'
                }
            })
            .subscribe(({data}) => {
                this.setDataRelationsObject(data);
            });
    }

    setDataRelationsObject(data: any) {
        // set editor
        this.editors = _.map(<Editor[]>data.coreConfig, obj => {
            return { value: obj.id, label: obj.name };
        }); // get types
        this.editors.unshift({ label: 'Select a editor', value: '' });

        // set fieldsGroups
        this.fieldGroups = _.map(<FieldGroup[]>data.adminFieldGroups, obj => {
            return { value: obj.id, label: obj.name };
        });
        this.fieldGroups.unshift({ label: 'Select a field group', value: '' });
    }
}
