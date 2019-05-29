import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ValidationMessageService } from '@horus/services/validation-message.service';
import { HttpService } from '@horus/services/http.service';
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
                                <mat-option *ngFor="let group of groups" [value]="group.id">{{ group.name }}</mat-option>
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
export class InscriptionExportDialogComponent implements OnInit {

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
        private _sanitizer: DomSanitizer
    ) {

        this.createForm();

    }

    createForm(): void {

        this.fg = this._fb.group({
            group_id: ['', Validators.required]
        });

    }

    ngOnInit(): void {

        this._validationMessageService.subscribeForm(this.fg, this.formErrors);

        this.showSpinner = true;

        const ob$ = this._http
            .apolloClient()
            .watchQuery({
                query: gql`
                    query ForemGetGroups ($sql:[CoreSQLInput]) {
                        foremGroups (sql:$sql) {
                            id
                            name
                        }
                    }`,
                variables: {
                    // sql: [{
                    //     command: 'where',
                    //     column: 'forem_group.id',
                    //     operator: '=',
                    //     value: this.data.id
                    // }]
                }
            })
            .valueChanges
            .subscribe(({data}) => {

                ob$.unsubscribe();

                this.groups = data['foremGroups'];
                this.showSpinner = false;

            });

    }

    postRecord(): void {

        if (this.fg.valid) {

            this.loadingButton = true;

            console.log(this.fg.value);



            const ob$ = this._http
                .apolloClient()
                .mutate({
                    mutation: gql`
                        mutation ForemExportInscriptions ($id:Int!) {
                            foremExportInscription (id:$id)
                        }
                    `,
                    variables: {
                        id: this.fg.get('group_id').value
                    }
                })
                .subscribe(({data}) => {

                    this._http
                        .httpClient()
                        .post(this._http.restUrl + '/api/v1/admin/file-manager/read', {
                            mime: 'application/zip',
                            pathname: 'app/public/forem/export/' + data.foremExportInscription
                        },
                        {
                            responseType: 'blob'
                        })
                        .subscribe((res) => {

                            const blob = new Blob([res], { type: data.foremExportInscription });

                            // IE doesn't allow using a blob object directly as link href
                            // instead it is necessary to use msSaveOrOpenBlob
                            if (window.navigator && window.navigator.msSaveOrOpenBlob) {

                                window.navigator.msSaveOrOpenBlob(blob);
                                return;

                            }

                            const fileUrl = this._sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
                            if (environment.debug) console.log('DEBUG - response file url to download: ', fileUrl);

                            const link = document.createElement('a');
                            link.href = fileUrl['changingThisBreaksApplicationSecurity'];
                            link.download = data.foremExportInscription;

                            // this is necessary as link.click() does not work on the latest firefox
                            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

                            setTimeout(() => {

                                // For Firefox it is necessary to delay revoking the ObjectURL
                                window.URL.revokeObjectURL(fileUrl['changingThisBreaksApplicationSecurity']);
                                link.remove();

                                this.loadingButton = false;
                                this._dialogRef.close(data.foremExportInscription);

                            }, 100);

                        });

                    ob$.unsubscribe();
                });

        }

    }

}
