import { Component, Input, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';
import { Category, PriceType, Product, ProductClassTax, ProductType, Section } from '../../../apps/market/market.models';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MarketableService } from './marketable.service';

@Component({
    selector: 'dh2-marketable',
    templateUrl: './marketable.component.html'
})
export class MarketableComponent implements OnInit
{
    @ViewChild('inputName') inputName: ElementRef;
    @Input() object = {};
    @Input() fg: FormGroup; // FormGroup from parent component
    @Input() hidden = false;
    @Input() hiddenFields: string[] = [];
    @Input() products: Product[] = [];
    @Input() categories: Category[] = [];
    @Input() sections: Section[] = [];
    @Input() productTypes: ProductType[] = [];
    @Input() priceTypes: PriceType[] = [];
    @Input() productClassTaxes: ProductClassTax[] = [];
    @Input() nameField = 'name';
    @Output() checkingSlug = new EventEmitter<boolean>();
    @Output() checkingPrice = new EventEmitter<boolean>();

    loadingPrice = false;
    loadingSlug = false;
    modelProductLang = 'Syscover\\Market\\Models\\ProductLang';
    marketableFg: FormGroup;

    constructor(
        private _marketable: MarketableService,
        private _fb: FormBuilder
    ) {
        this.init();
    }

    init(): void
    {
        this.marketableFg = this._fb.group({
            active: false,
            categories_id: [[], Validators.required],
            lang_id: [null, Validators.required],
            name: [null, Validators.required],
            parent_id: null,
            price: null,
            price_type_id: [null, Validators.required],
            product_class_tax_id: [null, Validators.required],
            sections_id: [],
            sku: null,
            slug: [null, Validators.required],
            sort: null,
            subtotal: null,
            subtotal_format: [{value: null, disabled: true}, Validators.required],
            tax_format: [{value: null, disabled: true}, Validators.required],
            total_format: [{value: null, disabled: true}, Validators.required],
            type_id: [null, Validators.required],
            weight: [0]
        });
    }

    ngOnInit(): void
    {
        if (this.fg.get('is_product'))
        {
            // subscribe to name marketable changes
            this.fg.get('is_product')
                .valueChanges
                .subscribe(val => {
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

    // get taxes for product
    handleGetProductTaxes(subtotal?, forceCalculatePriceWithoutTax?, callback?): void
    {
        this._marketable.handleGetProductTaxes(
            this.fg,
            subtotal,
            forceCalculatePriceWithoutTax, // force to calulate price without tax
            callback, // callback, all http petition must to be sequential to pass JWT
            (value) => { // pass argument like function to respect scope
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
}
