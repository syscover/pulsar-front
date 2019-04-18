import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { Status } from '../cms.models';
import { graphQL } from './article.graphql';

@Component({
    selector: 'dh2-article-list',
    templateUrl: './article-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class ArticleListComponent extends CoreListComponent
{
    objectTranslation = 'CMS.ARTICLE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['cms_article.id', 'cms_article.name', 'cms_article.publish', 'cms_article.slug', 'cms_section.id', 'cms_section.name'];
    displayedColumns = ['cms_article.id', 'cms_article.name', 'cms_article.publish', 'cms_section.name', 'status_id', 'translations', 'actions'];
    filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang.id }];
    statuses: Status[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    // overwrite method to get statuses
    getCustomArgumentsGetRecords(args: object): object
    {    
        args['config'] = {
            key: 'pulsar-cms.statuses',
            lang: this.baseLang.id,
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
