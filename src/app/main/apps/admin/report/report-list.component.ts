import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './report.graphql';
import { Report } from '../admin.models';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../../../environments/environment';

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
        private _sanitizer: DomSanitizer
    ) {
        super(injector, graphQL);
    }

    runReport(report: Report): void
    {
        const ob$ = this.http
            .apolloClient()
            .watchQuery({
                query: graphQL.queryRunReport,
                variables: {
                    id: report.id
                }
            })
            .valueChanges
            .subscribe((res) => {

                if (environment.debug) console.log('DEBUG - response execute report: ', res);

                this.http
                    .httpClient()
                    .post(this.http.restUrl + '/api/v1/admin/file-manager/read',
                        {
                            file: res.data['adminRunReport']['file']
                        },
                        {
                            responseType: 'blob'
                        }
                    )
                    .subscribe((data) => {

                        const blob = new Blob([data], { type: res.data['adminRunReport']['file']['mime'] });

                        // IE doesn't allow using a blob object directly as link href
                        // instead it is necessary to use msSaveOrOpenBlob
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(blob);
                            return;
                        }

                        const fileUrl = this._sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));

                        if (environment.debug) console.log('DEBUG - response file url to download: ', fileUrl);

                        const link = document.createElement('a');
                        link.href = fileUrl['changingThisBreaksApplicationSecurity'];
                        link.download = res.data['adminRunReport']['filename'] + '.' + res.data['adminRunReport']['extension'];

                        // this is necessary as link.click() does not work on the latest firefox
                        link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

                        setTimeout(function () {
                             // For Firefox it is necessary to delay revoking the ObjectURL
                             window.URL.revokeObjectURL(fileUrl['changingThisBreaksApplicationSecurity']);
                             link.remove();
                        }, 100);


                    });
            });
    }
}
