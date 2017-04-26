import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { TaxRuleService } from './tax-rule.service';
import { TaxRule } from './../market.models';

@Component({
    selector: 'ps-tax-rule-list',
    templateUrl: './tax-rule-list.component.html'
})
export class TaxRuleListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'tax_rate_zone.id', 'tax_rate_zone.name', 'tax_rate_zone.tax_rate'
    ];
    objects: TaxRule[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        // service for parent class
        protected injector: Injector,
        protected objectService: TaxRuleService,
    ) {
        super(injector);
    }
}
