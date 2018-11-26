import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { ArticleGraphQLService } from './article-graphql.service';
import { Status } from './../cms.models';

@Component({
    selector: 'dh2-article-list',
    templateUrl: './article-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class ArticleListComponent extends CoreListComponent
{
    objectTranslation = 'CMS.ARTICLE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['cms_article.id', 'cms_article.name', 'cms_article.publish', 'cms_article.slug', 'cms_section.id', 'cms_section.name'];
    displayedColumns = ['cms_article.id', 'cms_article.name', 'cms_article.publish', 'cms_section.name', 'status_id', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang }];
    statuses: Status[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: ArticleGraphQLService,
    ) {
        super(injector, graphQL);
    }

    // overwrite method to get statuses
    getCustomArgumentsGetRecords(args: Object): Object
    {    
        args['config'] = {
            key: 'pulsar-cms.statuses',
            lang: this.baseLang,
            property: 'name'
        };

        args['sql'].push({
            command: 'orderBy',
            operator: 'desc',
            column: 'cms_article.id'
        });

        return args;
    }

    setRelationsData(data: any): void 
    {
        this.statuses = data.cmsStatuses;
    }
}
