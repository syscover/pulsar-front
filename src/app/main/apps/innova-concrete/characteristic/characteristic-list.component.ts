import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './characteristic.graphql';

@Component({
    selector: 'dh2-innova-concrete-characteristic-list',
    templateUrl: './innova-concrete-characteristic-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class CharacteristicListComponent extends CoreListComponent
{
    objectTranslation = 'INNOVA.CHARACTERISTIC';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['innova_concrete_characteristic.id', 'innova_concrete_characteristic.name'];
    displayedColumns = ['innova_concrete_characteristic.id', 'innova_concrete_characteristic.name', 'actions'];

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
