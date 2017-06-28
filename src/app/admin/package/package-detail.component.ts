import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../shared/super/core-detail.component';
import { PackageGraphQLService } from './package-graphql.service';

@Component({
    selector: 'ps-package-detail',
    templateUrl: 'package-detail.component.html'
})
export class PackageDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected grahpQL: PackageGraphQLService
    ) {
        super(injector, grahpQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ],
            root: ['', Validators.required ],
            active: '',
            sort: [null, Validators.required ]
        });
    }
}
