import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from './../../../core/structures/core-detail-compoment';
import { graphQL } from './report.graphql';

@Component({
    selector: 'dh2-admin-report-detail',
    templateUrl: 'report-detail.component.html',
    animations: fuseAnimations
})
export class ReportDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'APPS.REPORT';
    objectTranslationGender = 'M';

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            subject: ['', Validators.required],
            sql: ['SELECT', Validators.required],
        });
    }
}
