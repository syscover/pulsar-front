import { Component, Injector } from '@angular/core';
import { fuseAnimations } from './../../../../../../@fuse/animations';
import { CoreListComponent } from './../../../core/structures/core-list-component';
import { FieldGraphQLService } from './field-graphql.service';

@Component({
    selector: 'dh2-field-list',
    templateUrl: './field-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['./../../../core/scss/improvements/core-list-component.scss']
})
export class FieldListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.FIELD';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_field.id', 'admin_field.name', 'admin_field_group.name'];
    displayedColumns = ['admin_field.id', 'admin_field.name', 'admin_field_group.name', 'translations', 'actions'];

    constructor(
        protected injector: Injector,
        protected graphQL: FieldGraphQLService
    ) {
        super(injector, graphQL);
    }
}
