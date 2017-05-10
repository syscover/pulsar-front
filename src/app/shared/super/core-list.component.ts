import { Injector, ViewChild, HostBinding } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent, ConfirmationService, DataTable } from 'primeng/primeng';

import { CoreService } from './core.service';
import { ConfigService } from './../../core/services/config.service';
import { Lang } from './../../admin/admin.models';

export class CoreListComponent {

    @HostBinding('class') classes = 'animated fadeIn';
    @ViewChild(('dataTableObjects')) dataTable: DataTable;

    protected router: Router;
    protected route: ActivatedRoute;
    protected totalRecords: number;     // total records in datatable
    protected filteredRecords: number;     // filtered records over total
    protected columnsSearch: string[];  // columns where will be used for global searchs
    protected langs: Lang[]; // Activated application lang

    // services superclass
    protected objectService: CoreService;
    protected confirmationService: ConfirmationService;
    protected configService: ConfigService;

    constructor(
        protected injector: Injector
    ) {
        this.confirmationService = injector.get(ConfirmationService);
        this.configService = injector.get(ConfigService);

        // set object properties
        this.langs = this.configService.getConfig('langs');
    }

    getRecords(f: Function): void {
        this.objectService
            .getRecords()
            .subscribe((response: any) => {
                f(response.data);
            });
    }

    /**
     * loadDadaTableLazy method
     *
     * @param event
     * @param f
     * @param lang      if need all results must be filtered by lang
     */
    loadDadaTableLazy(event: LazyLoadEvent, f: Function, lang: string = undefined) {

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

        // set commands to orderBy
        if (event.sortField) {
            parameters.push({
                    'command': 'orderBy',
                    'operator': event.sortOrder === 1 ? 'asc' : 'desc', // asc | desc
                    'column': event.sortField
                });
        }

        // set commands to filter
        if (event.globalFilter) {
            for (const column of this.columnsSearch) {
                parameters.push({
                    'command': 'orWhere',
                    'column': column,
                    'operator': 'like',
                    'value': `%${event.globalFilter}%`
                });
            }
        }

        // search elements by paramenters
        this.objectService
                .searchRecords({
                'type': 'query',
                'lang': lang,
                'parameters': parameters
            })
            .subscribe((response) => {
                this.totalRecords = response.total;
                this.filteredRecords = response.filtered;
                f(response.data);
            });
    }

    deleteRecord(f: Function, object: any): void {

        let lang: string;

        if (object.lang_id) {   // check if has languages
            lang = object.lang_id;
        }

        // confirm to delete object
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete this object?',
            accept: () => {
                this.objectService
                    .deleteRecord(object.id, lang)
                    .subscribe((response) => {
                        //delete object and call onLazyLoad event on datatable
                        this.dataTable.onLazyLoad.emit(
                            this.dataTable.createLazyLoadMetadata()
                        );
                    });
            }
        });
    }

}
