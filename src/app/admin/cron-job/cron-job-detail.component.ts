import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CronJobGraphQLService } from './cron-job-graphql.service';
import { Package } from './../admin.models';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-cron-job-detail',
    templateUrl: 'cron-job-detail.component.html'
})
export class CronJobDetailComponent extends CoreDetailComponent {

    packages: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: CronJobGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required],
            package_id: ['', Validators.required],
            root: ['', Validators.required],
            active: '',
            sort: [null, Validators.required ]
        });
    }

    setRelationsData(data: any) {
        // set packages
        this.packages = _.map(<Package[]>data['adminPackages'], obj => {
            return { value: obj.id, label: obj.name };
        });
        this.packages.unshift({ label: 'Select a package', value: '' });
    }
}
