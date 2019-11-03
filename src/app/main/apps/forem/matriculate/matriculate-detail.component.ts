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

    constructor(
        protected injector: Injector
    ) 
    {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            ix: '',
            id: ['', [Validators.required, Validators.minLength(2)]],
            name: ['', Validators.required]
        });
    }

    getCustomArgumentsGetRecord(args, params)
    {
        console.log(params);
        args.sql[0].value = params.matriculate;
        
        return args;
    }
}
