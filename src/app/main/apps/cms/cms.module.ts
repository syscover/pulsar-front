import { NgModule } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { SharedModule } from './../../core/modules/shared.module';
import { CmsRoutingModule } from './cms-routing.module';
import { locale as english } from './i18n/en';
import { locale as spanish } from './i18n/es';

import { ArticleListComponent } from './article/article-list.component';
import { ArticleDetailComponent } from './article/article-detail.component';
import { CategoryListComponent } from './category/category-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { FamilyListComponent } from './family/family-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';
import { SectionListComponent } from './section/section-list.component';
import { SectionDetailComponent } from './section/section-detail.component';

import { ArticleGraphQLService } from './article/article-graphql.service';
import { CategoryGraphQLService } from './category/category-graphql.service';

@NgModule({
    imports: [
        SharedModule,
        CmsRoutingModule
    ],
    exports: [ ],
    declarations: [
        ArticleListComponent,
        ArticleDetailComponent,
        CategoryListComponent,
        CategoryDetailComponent,
        FamilyListComponent,
        FamilyDetailComponent,
        SectionListComponent,
        SectionDetailComponent
    ],
    providers: [
        ArticleGraphQLService,
        CategoryGraphQLService
    ]
})

export class CmsModule 
{
    constructor(
        private translationLoader: FuseTranslationLoaderService
    ){
        this.translationLoader.loadTranslations(english, spanish);
    }
}
