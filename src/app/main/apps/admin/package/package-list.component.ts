
import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { PackageGraphQLService } from './package-graphql.service';

@Component({
    selector: 'dh2-package-list',
    templateUrl: './package-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class PackageListComponent extends CoreListComponent 
{
    objectTranslation = 'ADMIN.PACKAGE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_package.id', 'admin_package.name', 'admin_package.root'];
    displayedColumns = ['admin_package.id', 'admin_package.name', 'admin_package.root', 'admin_package.sort', 'admin_package.active', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: PackageGraphQLService
    ) {
        super(injector, graphQL);
    }
}