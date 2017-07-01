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
                Validators.minLength(5),
                Validators.maxLength(30)]
            ],
            name: ['', Validators.required ],
            article_family_id: ''
        });
    }

    getArgsToGetRecord(params: Params) {
        return {
            sql: [{
                command: 'where',
                column: 'section.id',
                operator: '=',
                value: params['id']
            }]
        };
    }

    setDataRelationsObject(data: any) {
        this.families = _.map(<Family[]>data['cmsFamilies'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.families.unshift({ label: 'Select a family', value: '' });
    }
}
