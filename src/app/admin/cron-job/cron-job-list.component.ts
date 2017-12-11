import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { CronJobGraphQLService } from './cron-job-graphql.service';

@Component({
    selector: 'ps-cron-job-list',
    templateUrl: './cron-job-list.component.html'
})
export class CronJobListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: CronJobGraphQLService
    ) {
        super(injector, graphQL);
    }
}
