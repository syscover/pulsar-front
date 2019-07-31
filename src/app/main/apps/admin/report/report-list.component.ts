import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { DownloadService } from '@horus/services/download.service';
import { File } from '@horus/types';
import { graphQL } from './report.graphql';
import { Report } from '../admin.models';
import { environment } from 'environments/environment';

@Component({
    selector: 'dh2-admin-report-list',
    templateUrl: './report-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class ReportListComponent extends CoreListComponent implements AfterViewInit, OnInit
{
    objectTranslation = 'APPS.REPORT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_report.id', 'admin_report.subject', 'admin_report.filename', 'admin_report.extension'];
    displayedColumns = ['admin_report.id', 'admin_report.subject', 'admin_report.filename', 'actions'];

    constructor(
        protected injector: Injector,
        private _downloadService: DownloadService
    )
    {
        super(injector, graphQL);
    }

    runReport(report: Report): void
    {
        this.isLoadingResults = true;

        const ob$ = this.http
            .apolloClient()
            .mutate({
                mutation: graphQL.mutationRunReport,
                variables: {
                    id: report.id
                }
            })
            .subscribe((res) =>
            {
                ob$.unsubscribe();
                
                if (environment.debug) console.log('DEBUG - response execute report: ', res);
                
                // casting to file
                const file = <File>res.data['adminRunReport'];
                
                // call download service
                this._downloadService
                    .download(file, () => {
                        this.isLoadingResults = false;
                    });
            });
    }
}
