import { ViewChild } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { LazyLoadEvent, DataTable } from 'primeng/primeng';

import { CoreService } from './core.service';

export class CoreListComponent {

    protected totalRecords: number;
    private columnsSearch: string[] = [
        'name'
    ];

    constructor(
        private parentService: CoreService,
        private parentRoute: ActivatedRoute
    ) { }

    getRecords(f: Function): void {
        this.parentService
            .getRecords()
            .subscribe((response: any) => {
                f(response.data);
            });
    }

    loadDadaTableLazy(event: LazyLoadEvent, f: Function) {

        let parameters: Object[] = [
            {
                'command': 'limit',
                'value': event.rows
            },
            {
                'command': 'offset',
                'value': event.first
            }
        ];

        if (event.sortField) {
            parameters.push({
                    'command': 'orderBy',
                    'operator': event.sortOrder === 1 ? 'asc' : 'desc', // asc | desc
                    'column': event.sortField
                });
        }

        if (event.globalFilter) {
            for (const column of this.columnsSearch) {
                parameters.push({
                    'command': 'where',
                    'column': column,
                    'operator': 'like',
                    'value': `%${event.globalFilter}%`
                });
            }
        }

        const object = {
            'type': 'query',
            'parameters': parameters
        };

        this.parentService
            .searchRecords(object)
            .subscribe((response) => {
                this.totalRecords = response.total;
                f(response.data);
            });
    }

    deleteRecord(f: Function, object: any): void {

        let lang: string;

        if (object.lang_id) {   // check if has languages
            lang = object.lang_id;
        }

        this.parentService
            .deleteRecord(object.id, lang)
            .subscribe((response) => {
                this.getRecords(f);
            });
    }

}
