import { Component, Injector } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { Chips, ChipsDecoratorInterface } from '../../../core/decorators/chips.decortor';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { Extension, Frequency } from '../admin.models';
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
    separatorKeysCodes = [ENTER, COMMA];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    addTag: (formGroup: FormGroup, name: string, event: MatChipInputEvent) => void;
    removeTag: (formGroup: FormGroup, name: string, tag) => void;

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            subject: ['', Validators.required],
            emails: [],
            filename: ['', Validators.required],
            extension: ['', Validators.required],
            frequency_id: ['', Validators.required],
            sql: ['', Validators.required],
        });
    }

    argumentsRelationsObject(): object
    {
        const configExtensions = {
            key: 'pulsar-admin.extensions',
            property: 'name'
        };

        const configFrequencies = {
            key: 'pulsar-admin.frequencies',
            lang: this.baseLang,
            property: 'name'
        };

        return {
            configExtensions,
            configFrequencies
        };
    }

    setRelationsData(data: any): void
    {
        // admin extensions
        this.extensions = data.adminExtensions;

        // admin frequencies
        this.frequencies = data.adminFrequencies;
    }
}
