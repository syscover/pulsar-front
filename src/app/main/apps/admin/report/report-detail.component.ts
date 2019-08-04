import { Component, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent, MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Chips, ChipsDecoratorInterface } from '@horus/decorators/chips.decortor';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';
import { Extension, Frequency, Profile, FieldType, DataType } from '../admin.models';
import { WildcardDialogComponent } from './wildcard-dialog.component';
import { graphQL } from './report.graphql';

@Chips()
@Component({
    selector: 'dh2-admin-report-detail',
    templateUrl: 'report-detail.component.html',
    animations: fuseAnimations
})
export class ReportDetailComponent extends CoreDetailComponent implements ChipsDecoratorInterface
{
    objectTranslation = 'APPS.REPORT';
    objectTranslationGender = 'M';

    frequencies: Frequency[] = [];
    extensions: Extension[] = [];
    emails: String[] = [];
    profiles: Profile[] = [];
    separatorKeysCodes = [ENTER, COMMA];

    fieldTypes: FieldType[] = [];
    dataTypes: DataType[] = [];

    constructor(
        protected injector: Injector,
        private _dialog: MatDialog,
    ) {

        super(injector, graphQL);

    }

    addTag: (formGroup: FormGroup, name: string, event: MatChipInputEvent) => void;
    removeTag: (formGroup: FormGroup, name: string, tag) => void;

    createForm(): void {

        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            subject: ['', Validators.required],
            emails: [],
            profiles: [],
            filename: ['', Validators.required],
            extension: ['', Validators.required],
            frequency_id: ['', Validators.required],
            sql: ['', Validators.required],
        });

    }

    argumentsRelationsObject(): object 
    {
        const configFieldTypes = {
            key: 'pulsar-admin.field_types'
        };

        const configDataTypes = {
            key: 'pulsar-admin.data_types'
        };

        const configExtensions = {
            key: 'pulsar-admin.extensions',
            property: 'name'
        };

        const configFrequencies = {
            key: 'pulsar-admin.frequencies',
            lang: this.baseLang.id,
            property: 'name'
        };

        return {
            configFieldTypes,
            configDataTypes,
            configExtensions,
            configFrequencies
        };

    }

    setRelationsData(data: any): void
    {
        // set fields types
        this.fieldTypes = data.coreConfigFieldTypes;

        // set data types
        this.dataTypes = data.coreConfigDataTypes;

        // admin extensions
        this.extensions = data.adminExtensions;

        // admin frequencies
        this.frequencies = data.adminFrequencies;

        // admin profiles
        this.profiles = data.adminProfiles;
    }

    handleWildcard()
    {
        const dialogRef = this._dialog.open(WildcardDialogComponent, {
            data: {
                fieldTypes: this.fieldTypes,
                dataTypes: this.dataTypes
            },
            width: '80vw'
        });
    }
}
