import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class MarketableService
{
    constructor(
        private fb: FormBuilder
    ) {}

    getProductFormGroup(): FormGroup
    {
        return this.fb.group({
            sku: null,
            categories_id: [],
            price: null
        });
    }
}
