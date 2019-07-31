import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from '@horus/services/validation-message.service';
import { HttpService } from '@horus/services/http.service';
import { DownloadService } from '@horus/services/download.service';
import { File } from '@horus/types';
import { horusConfig } from 'app/horus-config';
import { Group } from '../forem.models';
import gql from 'graphql-tag';
import { environment } from 'environments/environment';

@Component({
    selector: 'dh2-forem-inscription-export-dialog',
    template: `
        <horus-spinner [show]="showSpinner"></horus-spinner>
        <h1 mat-dialog-title>
            <mat-icon class="mr-16">backup</mat-icon>
            {{ 'FOREM.INSCRIPTION_EXPORT' | translate }}
        </h1>
        <div mat-dialog-content>
            <form id="formCategoryDialogDetail" 
                  [formGroup]="fg" 
                  (ngSubmit)="postRecord()">
                <div fxLayout="column" fxFlex>
                    <div fxLayout="row">
                        <mat-form-field [appearance]="horusConfig.fieldAppearance"
                                        class="col-12">
                            <mat-label>{{ 'APPS.GROUP' | translate }}</mat-label>
                            <mat-select formControlName="group_id" required>
                                <mat-option *ngFor="let group of groups" [value]="group.id">({{ group.id }}) {{ group.name }}</mat-option>
                            </mat-select>
                            <mat-error>{{ formErrors?.group_id }}</mat-error>
                        </mat-form-field>
                    </div>
                </div>
            </form>
        </div>
        <div mat-dialog-actions>
            
            <button mat-raised-button
                    type="submit"
                    form="formCategoryDialogDetail"
                    class="mat-accent mr-16"
                    [disabled]="fg.pristine || loadingButton">
                {{ 'APPS.EXPORT' | translate }}
                <mat-spinner class="ml-15 d-inline" *ngIf="loadingButton" mode="indeterminate" diameter="17"></mat-spinner>
            </button>
            
            <button mat-raised-button 
                    [mat-dialog-close]="false">
                {{ 'APPS.CANCEL' | translate }}
            </button>
            
        </div>
    `
})
export class InscriptionExportDialogComponent implements OnInit 
{
    fg: FormGroup;
    horusConfig = horusConfig;
    groups: Group[] = [];
    showSpinner = false;
    loadingButton = false;
    formErrors: any = {};

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<InscriptionExportDialogComponent>,
        private _fb: FormBuilder,
        private _validationMessageService: ValidationMessageService,
        private _http: HttpService,
        private _downloadService: DownloadService
    ) 
    {
        this.createForm();
    }

    createForm(): void 
    {
        this.fg = this._fb.group({
            group_id: ['', Validators.required]
        });
    }

    ngOnInit(): void 
    {
        this._validationMessageService.subscribeForm(this.fg, this.formErrors);

        this.showSpinner = true;

        let sql = [];
        if (this.data.restrictByProfile)
        {
            sql.push({
                command: 'where',
                column: 'forem_group.profile_id',
                operator: '=',
                value: this.data.profile_id
            })
        }

        const ob$ = this._http
            .apolloClient()
            .watchQuery({
                query: gql`
                    query ForemGetGroups ($sql:[CoreSQLInput]) {
                        foremGroups (sql:$sql) {
                            id
                            name
                            code
                        }
                    }`,
                variables: {sql}
            })
            .valueChanges
            .subscribe(({data}) => {

                ob$.unsubscribe();

                this.groups = data['foremGroups'];
                this.showSpinner = false;
            });
    }

    postRecord(): void
    {
        if (this.fg.valid)
        {
            this.loadingButton = true;

            const ob$ = this._http
                .apolloClient()
                .mutate({
                    mutation: gql`
                        mutation ForemExportInscriptions ($id:Int!) {
                            foremExportInscription (id:$id) {
                                url
                                filename
                                pathname
                                mime
                                size
                            }
                        }
                    `,
                    variables: {
                        id: this.fg.get('group_id').value
                    }
                })
                .subscribe((res) =>
                {
                    ob$.unsubscribe();

                    if (environment.debug) console.log('DEBUG - response execute report: ', res);

                    // casting to file
                    const file = <File>res.data['foremExportInscription'];

                    if (! file)
                    {
                        this.loadingButton = false;
                        this._dialogRef.close(file.filename);
                        return;
                    }

                    // call download service
                    this._downloadService
                        .download(file, () => {
                            this.loadingButton = false;
                            this._dialogRef.close(file.filename);
                        });
                });
        }
    }
}
