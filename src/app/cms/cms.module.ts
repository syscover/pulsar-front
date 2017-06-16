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

import { FieldService } from './../admin/field/field.service';
import { FieldGroupService } from './../admin/field-group/field-group.service';
import { ArticleService } from './article/article.service';
import { CategoryService } from './category/category.service';
import { SectionService } from './section/section.service';
import { FamilyService } from './family/family.service';

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
        FieldService,
        FieldGroupService,
        ArticleService,
        CategoryService,
        SectionService,
        FamilyService
    ]
})

export class CmsModule {
    constructor() {}
}
