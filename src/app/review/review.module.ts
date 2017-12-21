import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { ReviewRoutingModule } from './review-routing.module';

import { ObjectAverageGraphQLService } from './object-average/object-average-graphql.service';
import { ObjectAverageDetailComponent } from './object-average/object-average-detail.component';
import { ObjectAverageListComponent } from './object-average/object-average-list.component';
import { PollGraphQLService } from './poll/poll-graphql.service';
import { PollDetailComponent } from './poll/poll-detail.component';
import { PollListComponent } from './poll/poll-list.component';
import { QuestionGraphQLService } from './question/question-graphql.service';
import { QuestionDetailComponent } from './question/question-detail.component';
import { QuestionListComponent } from './question/question-list.component';
import { ReviewGraphQLService } from './review/review-graphql.service';
import { ReviewDetailComponent } from './review/review-detail.component';
import { ReviewListComponent } from './review/review-list.component';

import { PreferenceDetailComponent } from './preference/preference-detail.component';
import { PreferenceGraphQLService } from './preference/preference-graphql.service';


@NgModule({
    imports: [
        SharedModule,
        ReviewRoutingModule
    ],
    declarations: [
        ObjectAverageListComponent,
        ObjectAverageDetailComponent,
        PollListComponent,
        PollDetailComponent,
        QuestionListComponent,
        QuestionDetailComponent,
        ReviewListComponent,
        ReviewDetailComponent,
        PreferenceDetailComponent
    ],
    providers: [
        ObjectAverageGraphQLService,
        PollGraphQLService,
        QuestionGraphQLService,
        ReviewGraphQLService,
        PreferenceGraphQLService
    ]
})

export class ReviewModule { }
