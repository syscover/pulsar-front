import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { PollListComponent } from './poll/poll-list.component';
import { PollDetailComponent } from './poll/poll-detail.component';
import { PreferenceDetailComponent } from './preference/preference-detail.component';
import { ReviewListComponent } from './review/review-list.component';
import { ReviewDetailComponent } from './review/review-detail.component';

/*
        // Questions
        { path: 'question',                                     component: QuestionListComponent },
        { path: 'question/create',                              component: QuestionDetailComponent,                     data: { action: 'create' }},
        { path: 'question/create/:lang_id/:id',                 component: QuestionDetailComponent,                     data: { action: 'create-lang' }},
        { path: 'question/show/:lang_id/:id',                   component: QuestionDetailComponent,                     data: { action: 'edit' }},

        // Comments
        { path: 'comment',                                       component: CommentListComponent },
        { path: 'comment/create',                                component: CommentDetailComponent,                       data: { action: 'create' }},
        { path: 'comment/show/:id',                              component: CommentDetailComponent,                       data: { action: 'edit' }},

        // Averages
        { path: 'object-average',                               component: ObjectAverageListComponent },
        { path: 'object-average/create',                        component: ObjectAverageDetailComponent,                data: { action: 'create' }},
        { path: 'object-average/show/:id',                      component: ObjectAverageDetailComponent,                data: { action: 'edit' }},

        
            
*/

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [
            // Reviews
            { path: 'review',                                       component: ReviewListComponent },
            { path: 'review/create',                                component: ReviewDetailComponent,                       data: { action: 'create' }},
            { path: 'review/show/:id',                              component: ReviewDetailComponent,                       data: { action: 'edit' }},

            // Polls
            { path: 'poll',                                         component: PollListComponent },
            { path: 'poll/create',                                  component: PollDetailComponent,                         data: { action: 'create' }},
            { path: 'poll/show/:id',                                component: PollDetailComponent,                         data: { action: 'edit' }},

            // Preferences
            { path: 'preference',                                   component: PreferenceDetailComponent,                   data: { action: 'edit' }}
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReviewRoutingModule {}
