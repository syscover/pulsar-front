import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { TypeGraphQLService } from './type-graphql.service';

@Component({
    selector: 'ps-type-detail',
    templateUrl: './type-detail.component.html'
})
export class TypeDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: TypeGraphQLService
    ) {
        super(injector, graphQL);
    }

    createForm() {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            name: ['', Validators.required ]
        });
    }
}
