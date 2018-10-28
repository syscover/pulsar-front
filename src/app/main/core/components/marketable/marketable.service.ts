import { Injectable } from '@angular/core';

@Injectable()
export class MarketableService
{
    relationsFields: string;

    constructor() {
        this.init();
    }

    init(): void {

        this.relationsFields = `
            marketCategories (sql:$sqlCategory) {
                ix
                id
                lang_id
                name
            }
        `;
    }
}
