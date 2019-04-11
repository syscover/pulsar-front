import { Component, Injector, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/foundations/core-detail-compoment';
import { Group } from './../innova-concrete.models';
import { graphQL } from './people.graphql';

@Component({
    selector: 'dh2-innova-concrete-people-detail',
    templateUrl: 'people-detail.component.html',
    animations: fuseAnimations
})
export class PeopleDetailComponent extends CoreDetailComponent  implements OnInit
{
    public objectTranslation = 'INNOVA.PERSON';
    public objectTranslationGender = 'F';
    public groups: Group[] = [];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            group_id: ['', Validators.required],
            name: ['', Validators.required],
        });
    }

    setRelationsData(data: any): void
    {
        // innova concrete types
        this.groups = data.innovaConcreteGroups;
    }
}
