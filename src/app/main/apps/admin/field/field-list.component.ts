import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './field.graphql';
import { FieldType } from '../admin.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-admin-field-list',
    templateUrl: './field-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class FieldListComponent extends CoreListComponent
{
    objectTranslation = 'ADMIN.FIELD';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['admin_field.id', 'admin_field.name', 'admin_field_group.name', 'admin_field.field_type_name'];
    displayedColumns = ['admin_field.id', 'admin_field.name', 'admin_field.field_type_name', 'admin_field_group.name', 'translations', 'actions'];
    adminConfigFieldTypesId: any[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    getCustomArgumentsGetRecords(args: object): object
    {
        args['configFieldTypes'] = {
            key: 'pulsar-admin.field_types'
        };

        return args;
    }

    setRelationsData(data: any): void
    {
        this.adminConfigFieldTypesId = _.filter(data.adminConfigFieldTypes, {values: true})
            .map((fieldType: FieldType) => {
                if (fieldType.values) return fieldType.id;
            });
    }
}
