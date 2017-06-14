import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';

import { CoreListComponent } from './../../shared/super/core-list.component';
import { SectionService } from './section.service';

@Component({
    selector: 'ps-section-list',
    templateUrl: './section-list.component.html'
})
export class SectionListComponent extends CoreListComponent {

    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected objectService: SectionService,
    ) {
        super(injector, objectService);
    }
}
