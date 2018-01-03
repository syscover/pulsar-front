import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { ObjectAverageGraphQLService } from './object-average-graphql.service';
import { Poll } from './../review.models';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-object-average-detail',
    templateUrl: './object-average-detail.component.html'
})
export class ObjectAverageDetailComponent extends CoreDetailComponent {

    polls: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: ObjectAverageGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            poll_id: [{value: '', disabled: true}],
            object_name: [{value: null, disabled: true}],
            reviews: [{value: null, disabled: false}, Validators.required],
            total: [{value: null, disabled: false}, Validators.required],
            average: [{value: null, disabled: false}, Validators.required]
        });
    }

    setRelationsData(data: any) {
        // set polls
        this.polls = _.map(<Poll[]>data['reviewPolls'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.polls.unshift({ label: 'Select a poll', value: '' });
    }
}
