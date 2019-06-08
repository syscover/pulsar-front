import { Component, Injector } from '@angular/core';
import { MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreListComponent } from '@horus/foundations/core-list-component';
import { AuthenticationService } from '@horus/services/authentication.service';
import { graphQL } from './inscription.graphql';
import { InscriptionExportDialogComponent } from './inscription-export-dialog.component';

@Component({
    selector: 'dh2-forem-inscription-list',
    templateUrl: './inscription-list.component.html',
    animations : fuseAnimations,
    styleUrls: ['../../../../scss/improvements/core-list-component.scss']
})
export class InscriptionListComponent extends CoreListComponent
{
    objectTranslation = 'FOREM.INSCRIPTION';
    objectTranslationGender = 'F';
    columnsSearch: string[] = ['forem_inscription.id', 'forem_inscription.name', 'forem_inscription.surname', 'forem_inscription.tin', 'forem_group.name'];
    displayedColumns = ['forem_inscription.id', 'forem_inscription.name', 'forem_inscription.surname', 'forem_inscription.tin', 'forem_group.name', 'actions'];
    inscriptionExportDialogComponent = InscriptionExportDialogComponent;

    constructor(
        protected injector: Injector,
        private _dialog: MatDialog
    )
    {
        super(injector, graphQL);
    }

    exportDialog(): void
    {
        const dialogRef = this._dialog.open(this.inscriptionExportDialogComponent, {
            data: {
                id: ''// this.object[formGroupName]
            },
            width: '80vw'
        });

        dialogRef
            .afterClosed()
            .subscribe((object: any) =>
            {
                if (object)
                {
                    // if (this.env.debug) console.log('DEBUG - Add element: ', object);
                    //
                    // // Objects is the name of property, by to get reference.
                    // // If not, when is create lang and add new lang, mustTranslate
                    // // pipe doesn't work when change objects array
                    // this[objects] = this[objects].concat(object);
                    // this[objects] = _.orderBy(this[objects], ['name'], ['asc']);
                    // filteredObjects.next(this[objects].slice());
                    //
                    // if (multiple) {
                    //     this.fg.get(formGroupName).value.push(object.id);
                    //     this.fg.get(formGroupName).markAsDirty();
                    // }
                    // else {
                    //     this.fg.get(formGroupName).setValue(object.id);
                    // }
                }
            });
    }
}
