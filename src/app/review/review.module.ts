import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { ReviewRoutingModule } from './review-routing.module';
import { PollGraphQLService } from './poll/poll-graphql.service';
import { PollDetailComponent } from './poll/poll-detail.component';
import { PollListComponent } from './poll/poll-list.component';
import { QuestionGraphQLService } from './question/question-graphql.service';
import { QuestionDetailComponent } from './question/question-detail.component';
import { QuestionListComponent } from './question/question-list.component';
import { ReviewGraphQLService } from './review/review-graphql.service';
import { ReviewDetailComponent } from './review/review-detail.component';
import { ReviewListComponent } from './review/review-list.component';

@NgModule({
    imports: [
        SharedModule,
        ReviewRoutingModule
    ],
    declarations: [
        PollListComponent,
        PollDetailComponent,
        QuestionListComponent,
        QuestionDetailComponent,
        ReviewListComponent,
        ReviewDetailComponent
    ],
    providers: [
        PollGraphQLService,
        QuestionGraphQLService,
        ReviewGraphQLService
    ]
})

export class ReviewModule { }
