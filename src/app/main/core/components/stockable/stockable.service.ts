import { Injectable } from '@angular/core';

@Injectable()
export class StockableService
{
    constructor() {}

    getArgumentsRelations(product_id: string): Object
    {
        const sqlStock = [
            {
                command: 'where',
                column: 'product_id',
                operator: '=',
                value: product_id
            }
        ];

        return {
            sqlStock
        };
    }
}
