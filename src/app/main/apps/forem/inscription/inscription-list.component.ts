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
    displayedColumns = ['forem_inscription.id', 'forem_group.name', 'forem_group.composite_code', 'admin_profile.name',  'forem_inscription.name', 'forem_inscription.surname', 'forem_inscription.tin', 'actions'];
    inscriptionExportDialogComponent = InscriptionExportDialogComponent;

    constructor(
        protected injector: Injector,
        private _authenticationService: AuthenticationService,
        private _dialog: MatDialog
    )
    {
        super(injector, graphQL);

        if (this.dataRoute.resource === 'forem-inscription-office')
        {
            this.displayedColumns = ['forem_inscription.id', 'forem_group.name', 'forem_group.composite_code', 'forem_inscription.name', 'forem_inscription.surname', 'forem_inscription.tin', 'actions'];
            this.filters = [{'command': 'where', 'column': 'forem_inscription.profile_id', 'operator': '=', 'value': this._authenticationService.user().profile_id }];
        }
    }

    exportDialog(): void
    {
        const dialogRef = this._dialog.open(this.inscriptionExportDialogComponent, {
            data: {
                restrictByProfile: this.dataRoute.resource === 'forem-inscription-office',
                profile_id: this._authenticationService.user().profile_id
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
