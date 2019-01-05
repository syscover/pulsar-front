import { AfterViewInit, Component, Injector, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './report.graphql';
import { Report } from '../admin.models';
import 'rxjs/add/operator/toPromise';

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
                fetchPolicy: 'network-only',
                query: graphQL.queryRunReport,
                variables: {
                    id: report.id
                }
            })
            .valueChanges
            .subscribe(() => {


                this.http
                    .httpClient()
                    .post(this.http.apiUrl + '/api/v1/admin/file-manager/read',
                        {
                            filename: 'image.jpg'
                        },
                        {
                            responseType: 'blob'
                        }
                    )
                    .subscribe((data) => {

                        const blob = new Blob([data], { type: 'image/jpg' });

                        // IE doesn't allow using a blob object directly as link href
                        // instead it is necessary to use msSaveOrOpenBlob
                        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                            window.navigator.msSaveOrOpenBlob(blob);
                            return;
                        }

                        const fileUrl = this._sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
                        const fileUrl2 = window.URL.createObjectURL(blob);


                        console.log(blob);
                        console.log(fileUrl);
                        console.log(fileUrl2);

                        window.open(fileUrl['changingThisBreaksApplicationSecurity']);

                        const link = document.createElement('a');
                        link.href = fileUrl['changingThisBreaksApplicationSecurity'];
                        link.download = 'image.jpg';

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
