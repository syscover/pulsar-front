import {Component, Input, OnInit} from '@angular/core';
import {Category, Product} from '../../../apps/market/market.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'dh2-marketable',
    templateUrl: './marketable.component.html'
})
export class MarketableComponent implements OnInit
{
    @Input() fgName: string;
    @Input() fg: FormGroup;
    @Input() products: Product[] = [];
    @Input() categories: Category[] = [];

    constructor(
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void
    {
        if (this.fgName)
        {
            this.fg.addControl(this.fgName, this._fb.group({
                categories_id: [],
                parent_id: null,
                price: null,
                sku: null,
            }));
        }
        else
        {
            this.fg = this._fb.group({
                ...this.fg,
                categories_id: [],
                parent_id: null,
                price: null,
                sku: null,
            });
        }
    }
}
