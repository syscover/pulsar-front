import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ItemDialogComponent } from './item-dialog.component';
import { ConfirmationDialogComponent } from '@horus/components/confirmation-dialog/confirmation-dialog.component';
import { ConfigFormControls } from './list-items.models';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-list-items',
    templateUrl: './list-items.component.html',
    styleUrls: ['./list-items.component.scss']
})
export class ListItemsComponent implements OnInit
{
    displayedColumns: string[] = [];

    // texts
    @Input() title: string;
    @Input() itemTitle: string;

    @Input() key: string;
    @Input() name: string;
    // from where belong this component
    @Input() form: FormGroup;
    // form group controls config that will be compose each row
    @Input() formControls: ConfigFormControls[];

    // when set object value in edit action, set the FormArray
    @Input()
    set object(object: object)
    {
        if (Array.isArray(object[this.name]))
        {
            for (const i of object[this.name])
            {
                const configControls = {};

                for (const config of this.formControls)
                {
                    configControls[config['name']] = config['control'];
                }

                // set form group from parent component
                this.items.push(this._fb.group(configControls));
            }

            this.items.setValue(object[this.name]);
        }
    }

    constructor(
        private _dialog: MatDialog,
        private _fb: FormBuilder
    ) { }

    ngOnInit(): void
    {
        // set display columns
        this.displayedColumns = _.map(this.formControls, 'name');
        this.displayedColumns.push('actions');
    }

    get items(): FormArray
    {
        return this.form.get(this.name) as FormArray;
    }

    manageItem(object?): void
    {
        const dialogRef = this._dialog.open(ItemDialogComponent, {
            data: {
                title: this.itemTitle,
                formControls: this.formControls,
                object: object
            },
            width: '80vw'
        });

        dialogRef.afterClosed().subscribe((response: any) => {
            if (response)
            {
                if (response.oldObject)
                {
                    // find item index
                    const index = _.findIndex(this.items.value, [this.key, response.oldObject[this.key]]);

                    // replace item at index
                    this.items.setControl(index, response.fg);
                    this.items.markAsDirty();
                }
                else
                {
                    this.items.push(response.fg);
                    this.items.markAsDirty();
                }
            }
        });
    }

    deleteItem(object): void
    {
        const dialogRef = this._dialog.open(ConfirmationDialogComponent, {
            data: {
                title: 'DELETE?'
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result)
            {
                // find item index
                const index = _.findIndex(this.items.value, [this.key, object[this.key]]);
                this.items.removeAt(index);
                this.items.markAsDirty();
            }
        });
    }
}
