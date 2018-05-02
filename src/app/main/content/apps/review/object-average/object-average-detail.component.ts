import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { ObjectAverageGraphQLService } from './object-average-graphql.service';
import { Poll } from './../review.models';

@Component({
    selector: 'dh2-object-average-detail',
    templateUrl: 'object-average-detail.component.html',
    animations: fuseAnimations
})
export class ObjectAverageDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'REVIEW.AVERAGE';
    objectTranslationGender = 'F';
    polls: Poll[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: ObjectAverageGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() 
    {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            poll_id: [{value: null, disabled: true}],
            object_name: [{value: null, disabled: true}],
            reviews: [{value: null, disabled: true}, Validators.required],
            total: [{value: null, disabled: true}, Validators.required],
            average: [{value: null, disabled: true}, Validators.required]
        });
    }

    setRelationsData(data: any) 
    {
        // set review polls
        this.polls = data.reviewPolls;
    }
}

