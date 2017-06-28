import { Component, Injector, HostBinding } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { FamilyService } from './family.service';
import { FamilyGraphQL } from './family-graphql';

@Component({
    selector: 'ps-family-list',
    templateUrl: './family-list.component.html'
})
export class FamilyListComponent extends CoreListComponent {

    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name'
    ];

    constructor(
        protected injector: Injector,
        protected objectService: FamilyService,
    ) {
        super(injector, objectService);
        this.grahpQL = new FamilyGraphQL();
    }
}
