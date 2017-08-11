import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { ArticleGraphQLService } from './article-graphql.service';
import { LazyLoadEvent } from 'primeng/primeng';
import { Status } from './../cms.models';
import { environment } from './../../../environments/environment';

@Component({
    selector: 'ps-article-list',
    templateUrl: './article-list.component.html'
})
export class ArticleListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'cms_article.id', 'cms_article.name', 'cms_article.publish', 'cms_section.name'
    ];
    statuses: Status[] = [];

    constructor(
        // service for parent class
        protected injector: Injector,
        protected graphQL: ArticleGraphQLService,
    ) {
        super(injector, graphQL);
    }

    // overwite method to get statuses
    getCustomArgumentsGetRecords(args: Object): Object {
        // set arguments to get statuses
        args['config'] = {
            key: 'pulsar.cms.statuses',
            lang: this.baseLang,
            property: 'name'
        };
        return args;
    }

    setRelationsData(data: Object): void {
        this.statuses = data['cmsStatuses'];
    }
}
