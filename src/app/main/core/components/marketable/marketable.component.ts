import {Component, Input, ViewChild, ElementRef, OnInit} from '@angular/core';
import {Category, PriceType, Product, ProductType, Section} from '../../../apps/market/market.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';
import {ActivatedRoute} from '@angular/router';
import {DataRoute} from '../../structures/data-route';
import {ConfigService} from '../../services/config.service';
import {Lang} from '../../../apps/admin/admin.models';
import * as _ from 'lodash';
import {concatSeries} from 'async';

@Component({
    selector: 'dh2-marketable',
    templateUrl: './marketable.component.html'
})
export class MarketableComponent implements OnInit
{
    @ViewChild('inputName') inputName: ElementRef;
    @Input() fgName: string;
    @Input() fg: FormGroup;
    @Input() products: Product[] = [];
    @Input() categories: Category[] = [];
    @Input() sections: Section[] = [];
    @Input() productTypes: ProductType[] = [];
    @Input() priceTypes: PriceType[] = [];
    @Input() nameField = 'name';

    modelProductLang = 'Syscover\\Market\\Models\\ProductLang';
    slugValue: string;
    typeId: number;
    showWeight = false;

    constructor(
        private _fb: FormBuilder,
        private _config: ConfigService,
        private _route: ActivatedRoute
    ) {}

    ngOnInit(): void
    {
        this.setReactiveform();
        this.subscribeChangeName();
        this.setLang();
    }

    handleChangeProductType($event): void
    {
        this.showWeight = $event.value === 2 || $event.value === 3;
    }

    private setReactiveform(): void
    {
        if (this.fgName)
        {
            this.fg.addControl(this.fgName, this._fb.group({
                active: false,
                categories_id: [[], Validators.required],
                lang_id: [null, Validators.required],
                name: [null, Validators.required],
                parent_id: null,
                price: null,
                price_type_id: [null, Validators.required],
                sections_id: [],
                sku: null,
                slug: [null, Validators.required],
                sort: null,
                type_id: [null, Validators.required],
                weight: [0],
            }));
        }
        else
        {
            this.fg = this._fb.group({
                ...this.fg,
                active: false,
                categories_id: [[], Validators.required],
                lang_id: [null, Validators.required],
                name: [null, Validators.required],
                parent_id: null,
                price: null,
                price_type_id: [null, Validators.required],
                sections_id: [],
                sku: null,
                slug: [null, Validators.required],
                sort: null,
                type_id: [null, Validators.required],
                weight: [0],
            });
        }
    }

    private subscribeChangeName(): void
    {
        // subscribe to name marketable changes
        this.fg.controls[this.nameField]
            .valueChanges
            .pipe(
                startWith(
                    this.fg
                        .get(this.nameField)
                        .value
                )
            )
            .subscribe(val => {
                // set name
                this.fg
                    .get(this.fgName)
                    .get('name')
                    .setValue(val);

                // set slug
                this.slugValue = val;
            });
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

        // set lang_id
        if (this.fgName)
        {
            this.fg.get(this.fgName).get('lang_id').setValue(lang_id);
        }
        else {
            this.fg.get('lang_id').setValue(lang_id);
        }
    }
}
