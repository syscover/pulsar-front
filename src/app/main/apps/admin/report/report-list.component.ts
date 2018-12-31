import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { graphQL } from './report.graphql';

@Component({
    selector: 'dh2-admin-report-list',
    templateUrl: './report-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class ReportListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.REPORT';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_report.id', 'admin_report.subject', 'admin_report.filename'];
    displayedColumns = ['admin_report.id', 'admin_report.subject', 'admin_report.filename', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
