import { Component, Input, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Category, PriceType, Product, ProductClassTax, ProductType, Section } from '../../../apps/market/market.models';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { startWith } from 'rxjs/operators/startWith';
import { ActivatedRoute } from '@angular/router';
import { DataRoute } from '../../structures/data-route';
import { ConfigService } from '../../services/config.service';
import { Lang } from '../../../apps/admin/admin.models';
import { HttpService } from '../../services/http.service';
import { environment } from 'environments/environment';
import * as _ from 'lodash';

import gql from 'graphql-tag';
import {MarketableService} from './marketable.service';

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
    @Input() loadingPrice = false;

    // public properties
    modelProductLang = 'Syscover\\Market\\Models\\ProductLang';
    slugValue: string = null;
    env: any = environment;
    fg: FormGroup; // Marketable form group

    constructor(
        private _marketable: MarketableService,
        private _fb: FormBuilder,
        private _config: ConfigService,
        private _route: ActivatedRoute,
        private _http: HttpService
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
        let price;

        if (subtotal)
        {
            price = subtotal;
        }
        else if (this.fg.get('price').value)
        {
            price = this.fg.get('price').value;
        }
        else
        {
            price = this.fg.get('subtotal').value;
            forceCalculatePriceWithoutTax = true;
        }

        // if has not price, exit of method
        if (! price)
        {
            if (callback) callback();
            return;
        }

        // active loading spinner
        if (this.fg.get('price').value) this.loadingPrice = true;

        const args = {
            price: price,
            productClassTax: this.fg.get('product_class_tax_id').value
        };

        // force to calualte price without tax, when show product the price always
        // is without tax because is subtotal the refernece price, this flag is activated in
        // function setData os this component
        if (forceCalculatePriceWithoutTax) args['product_tax_prices'] = 1;

        const ob = this._http
            .apolloClient()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: gql`
                    query MarketProductTaxes ($price:Float! $productClassTax:Int $product_tax_prices:Int) {
                        marketProductTaxes (price:$price productClassTax:$productClassTax product_tax_prices:$product_tax_prices)
                    }
                `,
                variables: args
            })
            .valueChanges
            .subscribe(({data}: any) => {
                ob.unsubscribe();
                if (this.env.debug) console.log('DEBUG - response of marketProductTaxes query: ', data);

                this.fg.get('subtotal').setValue(data.marketProductTaxes.subtotal);
                this.fg.get('subtotal_format').setValue(data.marketProductTaxes.subtotalFormat);
                this.fg.get('tax_format').setValue(data.marketProductTaxes.taxAmountFormat);
                this.fg.get('total_format').setValue(data.marketProductTaxes.totalFormat);

                if (callback) callback();

                // reset price field
                if (this.fg.get('price').value) this.fg.get('price').setValue(null);

                this.loadingPrice = false;
            });
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
