import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';
import { ReviewRoutingModule } from './review-routing.module';
import { PollGraphQLService } from './poll/poll-graphql.service';
import { PollDetailComponent } from './poll/poll-detail.component';
import { PollListComponent } from './poll/poll-list.component';
import { QuestionGraphQLService } from './question/question-graphql.service';
import { QuestionDetailComponent } from './question/question-detail.component';
import { QuestionListComponent } from './question/question-list.component';

@NgModule({
    imports: [
        SharedModule,
        ReviewRoutingModule
    ],
    declarations: [
        PollListComponent,
        PollDetailComponent,
        QuestionListComponent,
        QuestionDetailComponent
    ],
    providers: [
        PollGraphQLService,
        QuestionGraphQLService
    ]
})

export class ReviewModule { }
