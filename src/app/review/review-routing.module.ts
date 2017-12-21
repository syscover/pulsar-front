import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';
import { AuthGuard } from './../core/auth/auth-guard.service';

import { ObjectAverageListComponent } from './object-average/object-average-list.component';
import { ObjectAverageDetailComponent } from './object-average/object-average-detail.component';
import { PollListComponent } from './poll/poll-list.component';
import { PollDetailComponent } from './poll/poll-detail.component';
import { QuestionDetailComponent } from './question/question-detail.component';
import { QuestionListComponent } from './question/question-list.component';
import { ReviewDetailComponent } from './review/review-detail.component';
import { ReviewListComponent } from './review/review-list.component';
import { PreferenceDetailComponent } from './preference/preference-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',                                                   component: DataContainerComponent,
                canActivateChild: [AuthGuard],
                children: [
                    // Polls
                    { path: 'poll',                                         component: PollListComponent },
                    { path: 'poll/create',                                  component: PollDetailComponent,                         data: { action: 'create' }},
                    { path: 'poll/show/:id',                                component: PollDetailComponent,                         data: { action: 'edit' }},

                    // Questions
                    { path: 'question',                                     component: QuestionListComponent },
                    { path: 'question/create',                              component: QuestionDetailComponent,                     data: { action: 'create' }},
                    { path: 'question/create/:lang_id/:id',                 component: QuestionDetailComponent,                     data: { action: 'create-lang' }},
                    { path: 'question/show/:lang_id/:id',                   component: QuestionDetailComponent,                     data: { action: 'edit' }},

                    // Reviews
                    { path: 'review',                                       component: ReviewListComponent },
                    { path: 'review/create',                                component: ReviewDetailComponent,                       data: { action: 'create' }},
                    { path: 'review/show/:id',                              component: ReviewDetailComponent,                       data: { action: 'edit' }},

                    // Averages
                    { path: 'object-average',                               component: ObjectAverageListComponent },
                    { path: 'object-average/create',                        component: ObjectAverageDetailComponent,                data: { action: 'create' }},
                    { path: 'object-average/show/:id',                      component: ObjectAverageDetailComponent,                data: { action: 'edit' }},

                    // Preferences
                    { path: 'preferences',                                  component: PreferenceDetailComponent,                   data: { action: 'edit' }},

                    // Wildcard route
                    { path: '**',                                           component: ErrorComponent,                              data: { error: '404' }}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ReviewRoutingModule {}
