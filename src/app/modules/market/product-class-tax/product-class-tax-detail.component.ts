import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { CoreDetailComponent } from './../../../core/super/core-detail.component';
import { ProductClassTaxGraphQLService } from './product-class-tax-graphql.service';

@Component({
    selector: 'app-product-class-tax-detail',
    templateUrl: 'product-class-tax-detail.component.html'
})
export class ProductClassTaxDetailComponent extends CoreDetailComponent {

    constructor(
        protected injector: Injector,
        protected graphQL: ProductClassTaxGraphQLService,
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
