import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Category, PriceType, Product, ProductClassTax, ProductType, Section } from '../../../apps/market/market.models';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { ActivatedRoute } from '@angular/router';
import { DataRoute } from '../../structures/data-route';
import { ConfigService } from '../../services/config.service';
import { Lang } from '../../../apps/admin/admin.models';
import { MarketableService } from './marketable.service';
import * as _ from 'lodash';

@Component({
    selector: 'dh2-marketable',
    templateUrl: './marketable.component.html'
})
export class MarketableComponent implements OnInit
{
    @ViewChild('inputName') inputName: ElementRef;
    @Input() fg: FormGroup; // FormGroup from parent component
    @Input() hiddenFields: string[] = [];
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

    constructor(
        private _marketable: MarketableService,
        private _fb: FormBuilder,
        private _config: ConfigService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void
    {
        this.setReactiveForm();
        // this.setLang();
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
        const marketableFg = this._fb.group({
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

        // add marketable controls to parentFg
        for (const control in marketableFg.controls)
        {
            // check if field has to add to form group
            if (this.hiddenFields.indexOf(control) === -1)
            {
                if (control) this.fg.addControl(control, marketableFg.get(control));
            }
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
