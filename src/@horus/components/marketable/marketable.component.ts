import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Category, PriceType, Product, ProductClassTax, ProductClass, Section } from '../../../app/main/apps/market/market.models';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MarketableService } from './marketable.service';
import { ReplaySubject } from 'rxjs';
import { environment } from 'environments/environment';
import { DataRoute } from '@horus/types';
import { Lang } from '@horus/types';
import { CategoryDialogComponent } from './category-dialog.component';
import * as _ from 'lodash';
import { horusConfig } from 'app/horus-config';

@Component({
    selector: 'dh2-marketable',
    templateUrl: './marketable.component.html'
})
export class MarketableComponent implements OnInit
{
    @Input() object = {};
    @Input() fg: FormGroup; // FormGroup from parent component
    @Input() lang: Lang;
    @Input() dataRoute: DataRoute; // static dataRoute Object pass from route module
    @Input() hidden = false;
    @Input() hiddenFields: string[] = [];
    @Input() products: Product[] = [];
    @Input() sections: Section[] = [];
    @Input() productClasses: ProductClass[] = [];
    @Input() priceTypes: PriceType[] = [];
    @Input() productClassTaxes: ProductClassTax[] = [];
    @Input() nameField = 'name';
    @Output() checkingSlug = new EventEmitter<boolean>();
    @Output() checkingPrice = new EventEmitter<boolean>();

    env: any = environment;
    loadingPrice = false;
    loadingSlug = false;
    modelProductLang = 'Syscover\\Market\\Models\\ProductLang';
    marketableFg: FormGroup;
    horusConfig = horusConfig;

    // categories
    @Input() categories: Category[] = [];
    categoryFilterCtrl: FormControl = new FormControl();
    filteredCategories: ReplaySubject<Category[]> = new ReplaySubject<Category[]>(1);
    categoryDialogComponent = CategoryDialogComponent;

    constructor(
        private _marketable: MarketableService,
        private _fb: FormBuilder,
        private _dialog: MatDialog
    ) 
    {
        this.init();
    }

    init(): void
    {
        this.marketableFg = this._fb.group({
            active: false,
            categories_id: [[], Validators.required],
            class_id: ['', Validators.required],
            cost: '',
            cost_per_sale: '',
            enable_from: '',
            enable_to: '',
            ends_at: '',
            fixed_cost: '',
            lang_id: ['', Validators.required],
            limited_capacity: '',
            name: ['', Validators.required],
            parent_id: '',
            price: '',
            price_type_id: ['', Validators.required],
            product_class_tax_id: ['', Validators.required],
            sections_id: [],
            sku: '',
            slug: ['', Validators.required],
            sort: '',
            starts_at: '',
            subtotal: '',
            subtotal_format: [{value: '', disabled: true}, Validators.required],
            tax_format: [{value: '', disabled: true}, Validators.required],
            total_format: [{value: '', disabled: true}, Validators.required],
            weight: [0],
            profitability: [{value: '', disabled: true}]
        });
    }

    ngOnInit(): void
    { 
        // set hidden files
        this._marketable.hiddenFields = this.hiddenFields;

        // set lang id if is defined like parameter
        if (this.lang)
        {
            this.marketableFg.get('lang_id').setValue(this.lang.id);
        }

        if (this.fg.get('is_product'))
        {
            // subscribe to name marketable changes
            this.fg.get('is_product')
                .valueChanges
                .subscribe(val => 
                {
                    this.setReactiveForm(! val);
                });
        }
        else
        {
            this.setReactiveForm(false);
        }
    }

    handleCheckingSlug($event): void
    {
        this.loadingSlug = $event;
        this.checkingSlug.emit($event);
    }

    handleChangeCost($event): void
    {
        this._marketable.calculateProfitability(this.fg, $event.target.value, this.fg.get('subtotal').value);
    }
    // get taxes for product
    handleGetProductTaxes(subtotal?, forceCalculatePriceWithoutTax?, callback?): void
    {
        this._marketable.handleGetProductTaxes(
            this.fg,
            subtotal,
            forceCalculatePriceWithoutTax, // force to calculate price without tax
            callback, // callback, all http petition must to be sequential to pass JWT
            (value) => // pass argument like function to respect scope
            {
                this.loadingPrice = value;
                this.checkingPrice.emit(value);
            }
        );
    }

    private setReactiveForm(hidden: boolean): void
    {
        if (hidden)
        {
            // add marketable controls to parentFg
            for (const control in this.marketableFg.controls)
            {
                // check if field has to add to form group
                if (this.hiddenFields.indexOf(control) === -1)
                {
                    this.fg.removeControl(control);
                }
            }
        }
        else
        {
            // add marketable controls to parentFg
            for (const control in this.marketableFg.controls)
            {
                // check if field has to add to form group
                if (this.hiddenFields.indexOf(control) === -1)
                {
                    this.fg.addControl(control, this.marketableFg.get(control));
                }
            }
        }
    }

    add(dialog, objects: string, filteredObjects: ReplaySubject<any[]>, formGroupName: string, multiple = false): void
    {
        const dialogRef = this._dialog.open(dialog, {
            data: {
                id: this.object[formGroupName],
                lang: this.lang,
                categories: this.categories // only for categoryDialogComponent
            },
            width: '80vw'
        });

        dialogRef.afterClosed().subscribe((object: any) => 
        {
            if (object)
            {
                if (this.env.debug) console.log('DEBUG - Add element: ', object);

                // objects is the name og objects[], by to get reference. If not,
                // when is create lang and add new lang, mustTranslate pipe doesn't work when change objects array
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
