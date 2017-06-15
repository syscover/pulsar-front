import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { ArticleService } from './article.service';

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
        protected objectService: ArticleService,
    ) {
        super(injector, objectService);
    }
}
