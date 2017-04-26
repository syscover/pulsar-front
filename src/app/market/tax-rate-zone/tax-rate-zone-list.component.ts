import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { TaxRateZoneService } from './tax-rate-zone.service';
import { TaxRateZone } from './../market.models';

@Component({
    selector: 'ps-tax-rate-zone-list',
    templateUrl: './tax-rate-zone-list.component.html'
})
export class TaxRateZoneListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'tax_rate_zone.id', 'tax_rate_zone.name', 'tax_rate_zone.tax_rate'
    ];
    objects: TaxRateZone[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        // service for parent class
        protected injector: Injector,
        protected objectService: TaxRateZoneService,
    ) {
        super(injector);
    }
}
