import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { fuseAnimations } from '@fuse/animations';
import { CoreDetailComponent } from '../../../core/structures/core-detail-compoment';
import { Category, Target, Assistance, Type } from '../forem.models';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectSearchService } from '../../../core/services/select-search.service';
import { CategoryDialogComponent } from '../category/category-dialog.component';
import * as _ from 'lodash';
import { graphQL } from './action.graphql';

@Component({
    selector: 'dh2-forem-category-detail',
    templateUrl: 'action-detail.component.html',
    animations: fuseAnimations
})
export class ActionDetailComponent extends CoreDetailComponent  implements OnInit
{
    objectTranslation = 'FOREM.ACTION';
    objectTranslationGender = 'F';
    loadingSlug = false;
    targets: Target[] = [];
    assistances: Assistance[] = [];
    types: Type[] = [];

    // categories
    categories: Category[] = [];
    categoryFilterCtrl: FormControl = new FormControl();
    filteredCategories: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);
    categoryDialogComponent = CategoryDialogComponent;

    constructor(
        protected injector: Injector,
        private _selectSearch: SelectSearchService,
        private _dialog: MatDialog
    ) {
        super(injector, graphQL);
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        this.setSelectSearch();
    }

    createForm(): void
    {
        this.fg = this.fb.group({
            id: [{value: '', disabled: true}],
            code: ['', Validators.required],
            name: ['', Validators.required],
            slug: ['', Validators.required],
            category_id: ['', Validators.required],
            target_id: ['', Validators.required],
            assistance_id: ['', Validators.required],
            type_id: ['', Validators.required],
            hours: ['', Validators.required],
            online: false,
            price: '',
            price_hour: '',
            subsidized: false,
            contents: '',
            requirements: '',
            observations: ''
        });
    }

    setSelectSearch(): void
    {
        // category
        this.categoryFilterCtrl
            .valueChanges
            .pipe(takeUntil(this._onDestroy))
            .subscribe(() => {
                this._selectSearch.filterSelect(
                    this.categoryFilterCtrl,
                    this.categories,
                    this.filteredCategories
                );
            });
    }

    argumentsRelationsObject(): Object
    {
        const configTargets = {
            key: 'pulsar-forem.targets'
        };

        const configAssistances = {
            key: 'pulsar-forem.assistances'
        };

        const configTypes = {
            key: 'pulsar-forem.types'
        };

        return {
            configTargets,
            configAssistances,
            configTypes
        };
    }

    setRelationsData(data: any): void
    {
        // set targets
        this.targets = <Target[]>data.foremTargets;

        // set assists
        this.assistances = <Assistance[]>data.foremAssistances;

        // set types
        this.types = <Type[]>data.foremTypes;

        // forem categories
        this.categories = data.foremCategories;
        this.filteredCategories.next(this.categories.slice());
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
    }

    add(dialog, objects: string, filteredObjects: ReplaySubject<any[]>, formGroupName: string, multiple = false): void
    {
        const dialogRef = this._dialog.open(dialog, {
            data: {
                id: this.object[formGroupName]
            },
            width: '80vw'
        });

        dialogRef.afterClosed().subscribe((object: any) => {

            if (object)
            {
                if (this.env.debug) console.log('DEBUG - Add element: ', object);

                // Objects is the name of property, by to get reference.
                // If not, when is create lang and add new lang, mustTranslate
                // pipe doesn't work when change objects array
                this[objects] = this[objects].concat(object);
                this[objects] = _.orderBy(this[objects], ['name'], ['asc']);
                filteredObjects.next(this[objects].slice());

                if (multiple) {
                    this.fg.get(formGroupName).value.push(object.id);
                    this.fg.get(formGroupName).markAsDirty();
                }
                else {
                    this.fg.get(formGroupName).setValue(object.id);
                }
            }
        });
    }
}
