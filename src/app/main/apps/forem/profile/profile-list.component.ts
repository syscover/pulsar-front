import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { graphQL } from './profile.graphql';

@Component({
    selector: 'dh2-forem-profile-list',
    templateUrl: './profile-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class ProfileListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.PROFILE';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['forem_profile.id', 'forem_profile.name'];
    displayedColumns = ['forem_profile.id', 'forem_profile.name', 'forem_profile.publish', 'actions'];

    constructor(
        protected injector: Injector
    ) 
    {
        super(injector, graphQL);
    }
}
