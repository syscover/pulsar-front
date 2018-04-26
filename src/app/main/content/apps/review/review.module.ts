import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from './../../../../../@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { ReviewRoutingModule } from './review-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { PollListComponent } from './poll/poll-list.component';
import { PollDetailComponent } from './poll/poll-detail.component';
import { ReviewListComponent } from './review/review-list.component';
import { ReviewDetailComponent } from './review/review-detail.component';

import { PollGraphQLService } from './poll/poll-graphql.service';
import { ReviewGraphQLService } from './review/review-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        ReviewRoutingModule
    ],
    exports: [ ],
    declarations: [
        PollListComponent,
        PollDetailComponent,
        ReviewListComponent,
        ReviewDetailComponent
    ],
    providers: [
        PollGraphQLService,
        ReviewGraphQLService
    ]
})

export class ReviewModule
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
