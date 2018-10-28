import {Component, Input, OnInit} from '@angular/core';
import { Category } from '../../../apps/market/market.models';

@Component({
    selector: 'dh2-marketable',
    templateUrl: './marketable.component.html',
})
export class MarketableComponent implements OnInit
{
    @Input()
    categories: Category[] = [];

    constructor(

    ) {

    }

    ngOnInit(): void
    {

    }
}
