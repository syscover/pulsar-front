import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { AverageGraphQLService } from './average-graphql.service';
import { SelectItem } from 'primeng/primeng';

@Component({
    selector: 'ps-average-detail',
    templateUrl: './average-detail.component.html'
})
export class AverageDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: AverageGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: null, disabled: true}],
            object_name: [{value: null, disabled: true}],
            reviews: [{value: null, disabled: true}],
            total: [{value: null, disabled: true}],
            average: [{value: null, disabled: true}]
        });
    }
}
