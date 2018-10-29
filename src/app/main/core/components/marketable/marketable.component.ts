import {Component, Input, ViewChild, ElementRef, OnInit} from '@angular/core';
import {Category, Product, Section} from '../../../apps/market/market.models';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {startWith} from 'rxjs/operators/startWith';

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
    @Input() nameField = 'name';

    modelProductLang = 'Syscover\\Market\\Models\\ProductLang';
    slugValue: string;

    constructor(
        private _fb: FormBuilder
    ) {}

    ngOnInit(): void
    {
        if (this.fgName)
        {
            this.fg.addControl(this.fgName, this._fb.group({
                categories_id: [[], Validators.required],
                name: [null, Validators.required],
                parent_id: null,
                price: null,
                sections_id: [],
                sku: null,
                slug: [null, Validators.required],
            }));
        }
        else
        {
            this.fg = this._fb.group({
                ...this.fg,
                categories_id: [[], Validators.required],
                name: [null, Validators.required],
                parent_id: null,
                price: null,
                sections_id: [],
                sku: null,
                slug: [null, Validators.required],
            });
        }

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
}
