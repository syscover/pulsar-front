import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { ArticleGraphQLService } from './article-graphql.service';

@Component({
    selector: 'ps-article-list',
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'article.id', 'article.name', 'article.publish'
    ];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: ArticleGraphQLService,
    ) {
        super(injector, graphQL);
    }
}
