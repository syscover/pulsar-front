import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './sappi-ic.graphql';

@Component({
    selector: 'dh2-bcci-sappi-ic-list',
    templateUrl: './sappi-ic-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../core/scss/improvements/core-list-component.scss']
})
export class SappiIcListComponent extends CoreListComponent
{
    objectTranslation = 'APPS.PACKAGE';
    objectTranslationGender = 'M';
    columnsSearch: string[] = ['bcci_sappi_ic.id', 'bcci_sappi_ic.origin_id', 'bcci_sappi_ic.interface_name', 'bcci_sappi_ic.application_id', 'bcci_sappi_ic.application_id'];
    columnsPattern: object = {'bcci_sappi_ic.id': true, 'bcci_sappi_ic.origin_id': true, 'bcci_sappi_ic.interface_name': true, 'bcci_sappi_ic.application_id': true, 'bcci_sappi_ic.critical': true, 'bcci_sappi_ic.complex': true};

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }
}
