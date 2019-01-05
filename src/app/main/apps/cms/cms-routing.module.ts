import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from '../../core/services/authorization.service';

import { ArticleListComponent } from './article/article-list.component';
import { ArticleDetailComponent } from './article/article-detail.component';
import { CategoryListComponent } from './category/category-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { FamilyListComponent } from './family/family-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';
import { SectionListComponent } from './section/section-list.component';
import { SectionDetailComponent } from './section/section-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [

            // Articles
            { path: 'article',                                          component: ArticleListComponent,                data: { action: 'list' }},
            { path: 'article/create',                                   component: ArticleDetailComponent,              data: { action: 'create' }},
            { path: 'article/create/:lang_id/:id',                      component: ArticleDetailComponent,              data: { action: 'create-lang' }},
            { path: 'article/show/:lang_id/:id',                        component: ArticleDetailComponent,              data: { action: 'edit' }},

            // Sections
            { path: 'section',                                          component: SectionListComponent,                data: { action: 'list' }},
            { path: 'section/create',                                   component: SectionDetailComponent,              data: { action: 'create' }},
            { path: 'section/show/:id',                                 component: SectionDetailComponent,              data: { action: 'edit' }},

            // Families
            { path: 'family',                                           component: FamilyListComponent,                 data: { action: 'list' }},
            { path: 'family/create',                                    component: FamilyDetailComponent,               data: { action: 'create' }},
            { path: 'family/show/:id',                                  component: FamilyDetailComponent,               data: { action: 'edit' }},

            // Categories
            { path: 'category',                                         component: CategoryListComponent,               data: { action: 'list' }},
            { path: 'category/create',                                  component: CategoryDetailComponent,             data: { action: 'create' }},
            { path: 'category/create/:lang_id/:id',                     component: CategoryDetailComponent,             data: { action: 'create-lang' }},
            { path: 'category/show/:lang_id/:id',                       component: CategoryDetailComponent,             data: { action: 'edit' }},
        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CmsRoutingModule {}
