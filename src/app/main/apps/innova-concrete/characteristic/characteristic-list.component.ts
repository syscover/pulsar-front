import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/foundations/core-list-component';
import { graphQL } from './characteristic.graphql';

@Component({
    selector: 'dh2-innova-concrete-characteristic-list',
    templateUrl: './characteristic-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class CharacteristicListComponent extends CoreListComponent
{
    objectTranslation = 'INNOVA.CHARACTERISTIC';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['innova_concrete_characteristic.id', 'innova_concrete_characteristic.name', 'innova_concrete_type.name'];
    displayedColumns = ['innova_concrete_characteristic.id', 'innova_concrete_characteristic.name', 'innova_concrete_type.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
