import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './report.graphql';

@Component({
    selector: 'dh2-admin-report-list',
    templateUrl: './report-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class ReportListComponent extends CoreListComponent implements AfterViewInit, OnInit
{
    objectTranslation = 'APPS.REPORT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_report.id', 'admin_report.subject', 'admin_report.filename', 'admin_report.extension'];
    displayedColumns = ['admin_report.id', 'admin_report.subject', 'admin_report.filename', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        this.init();
    }

    init(): void
    {
        if (this.dataRoute.action === 'run')
        {
            this.http
                .apolloClient()
                .watchQuery({
                    fetchPolicy: 'cache-and-network',
                    query: graphQL.queryRunReport,
                    variables: {
                        id: this.params['id']
                    }
                })
                .valueChanges
                .subscribe((data) => {
                    console.log(data);
                });
        }
    }
}
