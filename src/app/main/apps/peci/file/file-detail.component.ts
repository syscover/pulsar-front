import { Component, Injector } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-compoment';
import { graphQL } from './file.graphql';
import { FieldGroup } from '../../admin/admin.models';

@Component({
    selector: 'dh2-peci-file-detail',
    templateUrl: './file-detail.component.html',
    animations: fuseAnimations
})
export class FileDetailComponent extends CoreDetailComponent
{
    objectTranslation = 'ADMIN.ACTION';
    objectTranslationGender = 'F';
    graphQL = graphQL;

    fieldGroups: FieldGroup[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: [998765, [Validators.required, Validators.minLength(2)]],
            name: ['John Doe', Validators.required],
            type: 'Modificación',
            field_group_id: ''
        });
    }

    argumentsRelationsObject(): object
    {
        const sqlFieldGroup = [
            {
                command: 'where',
                column: 'resource_id',
                operator: '=',
                value: 'peci-file'
            }
        ];

        return {
            sqlFieldGroup
        };
    }

    setRelationsData(data: any): void
    {
        // market admin field groups
        this.fieldGroups = data.adminFieldGroups;
    }
}
