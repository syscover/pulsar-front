import { NgModule } from '@angular/core';
import { SharedModule } from './../shared/shared.module';

import { CmsRoutingModule } from './cms-routing.module';

import { ArticleListComponent } from './article/article-list.component';
import { ArticleDetailComponent } from './article/article-detail.component';
import { CategoryListComponent } from './category/category-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { SectionListComponent } from './section/section-list.component';
import { SectionDetailComponent } from './section/section-detail.component';
import { FamilyListComponent } from './family/family-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';

import { FamilyGraphQLService } from './family/family-graphql.service';
import { SectionGraphQLService } from './section/section-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        CmsRoutingModule
    ],
    declarations: [
        ArticleDetailComponent,
        ArticleListComponent,
        CategoryDetailComponent,
        CategoryListComponent,
        SectionListComponent,
        SectionDetailComponent,
        FamilyListComponent,
        FamilyDetailComponent
    ],
    providers: [
        FamilyGraphQLService,
        SectionGraphQLService
    ]
})

export class CmsModule {
    constructor() {}
}
