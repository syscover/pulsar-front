import { Component, Injector } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '../../../core/structures/core-list-component';
import { graphQL } from './sappi-ic.graphql';

import * as _ from 'lodash';

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
    // displayedColumns = ['bcci_sappi_ic.id', 'bcci_sappi_ic.origin_id',  'bcci_sappi_ic.application_id', 'bcci_sappi_ic.critical', 'bcci_sappi_ic.complex', 'actions'];

    verTest = false;

    constructor(
        protected injector: Injector
    ) {
        super(injector, graphQL);
    }

    testColumn(): void
    {
        console.log('PASA');
        this.verTest = !this.verTest;

        if (this.verTest)
        {
            this.displayedColumns.push('bcci_sappi_ic.interface_name');
        }
        else
        {
            _.remove(this.displayedColumns, (item) => {
                return item === 'bcci_sappi_ic.interface_name';
            });
        }

        console.log(this.displayedColumns);
    }
}
