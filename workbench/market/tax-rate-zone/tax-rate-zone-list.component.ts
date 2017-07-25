import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { TaxRateZoneGraphQLService } from './tax-rate-zone-graphql.service';

@Component({
    selector: 'ps-tax-rate-zone-list',
    templateUrl: './tax-rate-zone-list.component.html'
})
export class TaxRateZoneListComponent extends CoreListComponent {

    columnsSearch: string[] = [
        'tax_rate_zone.id', 'tax_rate_zone.name', 'tax_rate_zone.tax_rate'
    ];

    constructor(
        protected injector: Injector,
        protected graphQL: TaxRateZoneGraphQLService,
    ) {
        super(injector, graphQL);
    }
}
