import { Component, Injector } from '@angular/core';
import { CoreListComponent } from './../../shared/super/core-list.component';
import { PackageGraphQLService } from './package-graphql.service';

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
        protected graphQL: PackageGraphQLService
    ) {
        super(injector, graphQL);
    }
}
