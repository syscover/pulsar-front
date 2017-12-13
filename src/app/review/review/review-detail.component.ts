import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { ReviewGraphQLService } from './review-graphql.service';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'ps-review-detail',
    templateUrl: './review-detail.component.html'
})
export class ReviewDetailComponent extends CoreDetailComponent {

    actions: SelectItem[] = [
        { value: '', label: 'Select a action' },
        { value: 1, label: 'Validate and add score' },
        { value: 2, label: 'Invalidate and subtract score' }
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: ReviewGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            object_name: [{value: null, disabled: true}],
            customer_name: [{value: null, disabled: true}],
            customer_email: [{value: null, disabled: true}],
            average: [{value: null, disabled: true}],
            completed: [{value: null, disabled: true}],
            validated: [{value: null, disabled: true}],
            action_id: [null, Validators.required]
        });
    }

    getCustomArgumentsEditPostRecord(args, object) {
        let newArgs = {};

        newArgs['id'] = args['object']['id']
        newArgs['action_id'] = args['object']['action_id']
        args = newArgs;

        return args;
    }
}
