import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Category, PriceType, Product, ProductClassTax, ProductType, Section } from '../../../apps/market/market.models';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { ActivatedRoute } from '@angular/router';
import { DataRoute } from '../../structures/data-route';
import { ConfigService } from '../../services/config.service';
import { Lang } from '../../../apps/admin/admin.models';
import * as _ from 'lodash';
import { MarketableService } from './marketable.service';

@Component({
    selector: 'dh2-marketable',
    templateUrl: './marketable.component.html'
})
export class MarketableComponent implements OnInit
{
    @ViewChild('inputName') inputName: ElementRef;
    @Input() parentFgName: string;
    @Input() parentFg: FormGroup; // FormGroup from parent component
    @Input() products: Product[] = [];
    @Input() categories: Category[] = [];
    @Input() sections: Section[] = [];
    @Input() productTypes: ProductType[] = [];
    @Input() priceTypes: PriceType[] = [];
    @Input() productClassTaxes: ProductClassTax[] = [];
    @Input() nameField = 'name';
    loadingPrice = false;

    // public properties
    modelProductLang = 'Syscover\\Market\\Models\\ProductLang';
    slugValue: string = null;
    fg: FormGroup; // Marketable form group

    constructor(
        private _marketable: MarketableService,
        private _fb: FormBuilder,
        private _config: ConfigService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void
    {
        this.setReactiveForm();
        this.subscribeChangeName();
        this.setLang();
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
            }
        );
    }

    private setReactiveForm(): void
    {
        this.fg = this._fb.group({
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
            weight: [0],
        });

        if (this.parentFgName)
        {
            this.parentFg.addControl(this.parentFgName, this.fg);
        }
        else
        {
            // add marketable controls to parentFg
            for (const control in this.fg.controls)
            {
                if (control) this.parentFg.addControl(control, this.fg.get(control));
            }

            // set parentFg like fg to take the reference in template
            // <div [formGroup]="fg">
            this.fg = this.parentFg;
        }
    }

    private subscribeChangeName(): void
    {
        if (this.parentFgName)
        {
            // subscribe to name marketable changes
            this.parentFg.get(this.nameField)
                .valueChanges
                .pipe(
                    startWith(
                        this.parentFg
                            .get(this.nameField)
                            .value
                    )
                )
                .subscribe(val => {
                    // set name
                    this.parentFg
                        .get(this.parentFgName)
                        .get('name')
                        .setValue(val);

                    // set slug, use slugValue to detect chage in dh2Slug directive
                    this.slugValue = val;
                });
        }
    }

    private setLang(): void
    {
        // set lang_id
        const dataRoute = <DataRoute>this._route.snapshot.data;
        const params = this._route.snapshot.params;
        const langs = this._config.get('langs');
        const baseLang = this._config.get('base_lang');
        let lang_id: string;

        if (dataRoute.action === 'create')
        {
            lang_id = (<Lang>_.find(langs, {'id': baseLang})).id; // get baseLang object
        }

        if (dataRoute.action === 'create-lang' || dataRoute.action === 'edit')
        {
            lang_id = (<Lang>_.find(langs, {'id': params['lang_id']})).id; // get lang object
        }

        this.fg.get('lang_id').setValue(lang_id);
    }
}
