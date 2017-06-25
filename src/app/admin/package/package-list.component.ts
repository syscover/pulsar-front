import { Component, Injector } from '@angular/core';
import { LazyLoadEvent, DataTable, ConfirmationService } from 'primeng/primeng';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { PackageService } from './package.service';
import { Package } from '../admin.models';
import { PackageGraphQL } from './package-graphql';

@Component({
    selector: 'ps-package-list',
    templateUrl: './package-list.component.html'
})
export class PackageListComponent extends CoreListComponent {

    // paramenters for parent class
    // columns where will be used for global searchs
    columnsSearch: string[] = [
        'id', 'name', 'root'
    ];

    constructor(
        protected injector: Injector,
        protected objectService: PackageService
    ) {
        super(injector, objectService);
        this.grahpQL = new PackageGraphQL();
    }
}
