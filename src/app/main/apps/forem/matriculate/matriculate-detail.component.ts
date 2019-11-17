import { Component, Injector, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '@horus/foundations/core-detail-component';

import { graphQL } from './matriculate.graphql';

import * as _ from 'lodash';

@Component({
    selector: 'dh2-forem-matriculate-detail',
    templateUrl: 'matriculate-detail.component.html',
    animations: fuseAnimations
})
export class MatriculateDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'FOREM.MATRICULATE';
    objectTranslationGender = 'M';
    graphQL = graphQL;
    groupId: number;

    constructor(
        protected injector: Injector
    ) 
    {
        super(injector, graphQL);

        // set group_id to be used in template
        this.groupId = this.params['group_id'];
        this.fg.get('group_id').setValue(this.groupId);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}, [Validators.required, Validators.minLength(2)]],
            group_id: ['', Validators.required],
            name: ['', Validators.required],
            surname: ['', Validators.required],
            surname2: ['', Validators.required],
            gender: ['', Validators.required],
        });
    }
}
