import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { AuthenticationService } from '@horus/services/authentication.service';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { DownloadService } from '@horus/services/download.service';
import { ConfirmationDialogComponent } from '@horus/components/confirmation-dialog/confirmation-dialog.component';
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
    // filters = [{'command': 'where', 'column': 'lang_id', 'operator': '=', 'value': this.baseLang.id }];

    constructor(
        protected injector: Injector,
        private _downloadService: DownloadService,
        private _authenticationService: AuthenticationService,
        private _dialog: MatDialog
    )
    {
        super(injector, graphQL);
        this.filters = [{'command': 'whereJsonContains', 'column': 'profiles', 'operator': null, 'value': [this._authenticationService.user().profile_id]}];
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
                
                if (res.data['adminRunReport'])
                {
                    // casting to file
                    const file = <File>res.data['adminRunReport'];
                    
                    // call download service
                    this._downloadService
                        .download(file, () => 
                        {
                            this.isLoadingResults = false;
                        });
                }
                else
                {
                    this.isLoadingResults = false;
                    this.showNotResults();
                }
            });
    }

    showNotResults()
    {
        const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
            data: {
                title: this.translateService.instant('ADMIN.EMPTY_QUERY_TITLE'),
                question: this.translateService.instant('ADMIN.EMPTY_QUERY_MESSAGE')
            }
        });
    }
}
