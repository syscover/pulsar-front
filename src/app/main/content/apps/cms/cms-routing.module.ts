import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizationService } from './../../core/services/authorization.service';

import { ArticleListComponent } from './article/article-list.component';
// import { ActionDetailComponent } from './article/article-detail.component';

const routes: Routes = [
    {
        path: '',
        canActivate: [AuthorizationService],
        children: [

            // Articles
            { path: 'article',                                          component: ArticleListComponent },
            /* { path: 'article/create',                                   component: CountryDetailComponent,              data: { action: 'create' }},
            { path: 'article/create/:lang_id/:id',                      component: CountryDetailComponent,              data: { action: 'create-lang' }},
            { path: 'article/show/:lang_id/:id',                        component: CountryDetailComponent,              data: { action: 'edit' }}, */

        ]  
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CmsRoutingModule {}
