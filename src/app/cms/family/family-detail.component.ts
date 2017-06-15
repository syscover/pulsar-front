import { FieldGroup } from './../../admin/admin.models';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/primeng';

import { Editor } from './../cms.models';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { FamilyService } from './family.service';
import { FieldGroupService } from './../../admin/field-group/field-group.service';

import * as _ from 'lodash';

@Component({
    selector: 'ps-family-detail',
    templateUrl: './family-detail.component.html'
})
export class FamilyDetailComponent extends CoreDetailComponent implements OnInit {

    editors: SelectItem[] = [];
    fieldGroups: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected objectService: FamilyService,
        protected fieldGroupService: FieldGroupService
    ) {
        super(injector, objectService);
    }

    ngOnInit() {

        // get editors
        this.configService.getValue({
                key: 'pulsar.cms.editors'
            }).flatMap((response) => {

                this.editors = _.map(<Editor[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                }); // get types
                this.editors.unshift({ label: 'Select a editor', value: '' });

                return this.fieldGroupService.searchRecords({
                    'type': 'query',
                    'parameters': [
                        {
                            'command': 'where',
                            'column': 'field_group.resource_id',
                            'operator': '=',
                            'value': 'cms-article-family'
                        }
                    ]
                }); // return next observable
            }).subscribe((response) => {

                this.fieldGroups = _.map(<FieldGroup[]>response.data, obj => {
                    return { value: obj.id, label: obj.name };
                });

                this.fieldGroups.unshift({ label: 'Select a field group', value: '' });

                this.init();
            });
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
}
