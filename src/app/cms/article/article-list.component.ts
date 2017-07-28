import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { ArticleGraphQLService } from './article-graphql.service';
import { Status } from './../cms.models';

@Component({
    selector: 'ps-article-list',
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'article.id', 'article.name', 'article.publish', 'section.name'
    ];
    statuses: Status[] = [];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: ArticleGraphQLService,
    ) {
        super(injector, graphQL);
    }

    // to create a new object, do all queries to get data across GraphQL
    getGraphQLDataRelationsToCreateObject() {
        // set id of product if action is edit
        this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.graphQL.queryRelationsObject,
                variables: {
                    config: {
                        key: 'pulsar.cms.statuses',
                        lang: this.baseLang,
                        property: 'name'
                    }
                }
            })
            .subscribe(({data}) => {
                this.setDataRelationsObject(data);
            });
    }

    setDataRelationsObject(data) {
        // cms statuses
        this.statuses = data['cmsStatuses'];
    }
}
