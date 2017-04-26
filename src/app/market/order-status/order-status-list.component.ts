import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';

import { OrderStatusService } from './order-status.service';
import { OrderStatus } from '../market.models';
import { LangService } from './../../admin/lang/lang.service';
import { Lang } from './../../admin/admin.models';

@Component({
    selector: 'ps-order-status-list',
    templateUrl: './order-status-list.component.html'
})
export class OrderStatusListComponent extends CoreListComponent {

    activatedLangs: Lang[];

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'order_status.id', 'order_status.name'
    ];
    objects: OrderStatus[] = []; // initializes the component to has any data for view
    f: Function = data => this.objects = data; // function to set custom data

    constructor(
        protected langService: LangService,

        // service for parent class
        protected injector: Injector,
        protected objectService: OrderStatusService,
    ) {
        super(injector);
    }

    // overwritte method
    loadDadaTableLazy(event: LazyLoadEvent, f: Function) {
        // only get activated langs when activatedLangs is not instantiated
        if (this.activatedLangs) {
            super.loadDadaTableLazy(event, f, this.configService.getConfig('base_lang').id);
        } else {
            this.langService.getActivatedLangs().subscribe(response => {
                this.activatedLangs = <Lang[]>response.data;
                super.loadDadaTableLazy(event, f, this.configService.getConfig('base_lang').id);
            });
        }
    }

}
