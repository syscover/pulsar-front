import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { CronJobGraphQLService } from './cron-job-graphql.service';
import { Package, CronJob } from './../admin.models';
import { SelectItem } from 'primeng/primeng';
import * as _ from 'lodash';

@Component({
    selector: 'ps-cron-job-detail',
    templateUrl: 'cron-job-detail.component.html'
})
export class CronJobDetailComponent extends CoreDetailComponent {

    // set empty object, overwritte object to be used in this class
    object: CronJob = new CronJob();

    packages: SelectItem[] = [];

    constructor(
        protected injector: Injector,
        protected graphQL: CronJobGraphQLService
    ) {
        super(injector, graphQL);
    }

    beforePatchValueEdit() {

        // create copy object for change readonly properties
        let objectInput = Object.assign({}, this.object);

        // change publish and date format to Date, for calendar component
        objectInput['last_run'] = new Date(this.object.last_run);
        objectInput['next_run'] = new Date(this.object.next_run);

        // overwrite object with object cloned
        this.object = objectInput;
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            name: [null, Validators.required],
            package_id: ['', Validators.required],
            cron_expression: [null, Validators.required],
            command: [null, Validators.required],
            last_run: null,
            next_run: null,
            active: null
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
