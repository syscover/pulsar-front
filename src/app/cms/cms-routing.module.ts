import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DataContainerComponent } from './../shared/components/data-container/data-container.component';
import { ErrorComponent } from './../shared/components/errors/error.component';

import { AuthGuard } from './../core/auth/auth-guard.service';

import { ArticleListComponent } from './article/article-list.component';
import { ArticleDetailComponent } from './article/article-detail.component';
import { CategoryListComponent } from './category/category-list.component';
import { CategoryDetailComponent } from './category/category-detail.component';
import { SectionListComponent } from './section/section-list.component';
import { SectionDetailComponent } from './section/section-detail.component';
import { FamilyListComponent } from './family/family-list.component';
import { FamilyDetailComponent } from './family/family-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        children: [
            {
                path: '',                                       component: DataContainerComponent,
                canActivateChild: [AuthGuard],
                children: [

                    // Articles
                    { path: 'article',                              component: ArticleListComponent },
                    { path: 'article/create',                       component: ArticleDetailComponent,             data: { action: 'create' }},
                    { path: 'article/create/:lang_id/:object_id',   component: ArticleDetailComponent,             data: { action: 'create-lang' }},
                    { path: 'article/show/:lang_id/:object_id',     component: ArticleDetailComponent,             data: { action: 'edit' }},

                    // Categories
                    { path: 'category',                             component: CategoryListComponent },
                    { path: 'category/create',                      component: CategoryDetailComponent,             data: { action: 'create' }},
                    { path: 'category/create/:lang_id/:id',         component: CategoryDetailComponent,             data: { action: 'create-lang' }},
                    { path: 'category/show/:lang_id/:id',           component: CategoryDetailComponent,             data: { action: 'edit' }},

                    // Secions
                    { path: 'section',                              component: SectionListComponent },
                    { path: 'section/create',                       component: SectionDetailComponent,              data: { action: 'create' }},
                    { path: 'section/show/:object_id',              component: SectionDetailComponent,              data: { action: 'edit' }},

                    // Articles families
                    { path: 'family',                               component: FamilyListComponent },
                    { path: 'family/create',                        component: FamilyDetailComponent,               data: { action: 'create' }},
                    { path: 'family/show/:id',                      component: FamilyDetailComponent,               data: { action: 'edit' }},

                    // Wildcard route
                    { path: '**',                                   component: ErrorComponent,                      data: { error: '404' }}
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CmsRoutingModule {}
