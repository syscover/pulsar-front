import { Injector, ViewChild, HostBinding } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { LazyLoadEvent, ConfirmationService, DataTable } from 'primeng/primeng';

import { CoreService } from './core.service';
import { ConfigService } from './../../core/services/config.service';
import { Lang } from './../../admin/admin.models';

export class CoreListComponent {

    @HostBinding('class') classes = 'animated fadeIn';
    @ViewChild(('dataTableObjects')) dataTable: DataTable;

    protected params: Params;
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
        this.route = injector.get(ActivatedRoute);
        this.confirmationService = injector.get(ConfirmationService);
        this.configService = injector.get(ConfigService);

        // set object properties
        this.params = this.route.snapshot.params;
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
     * @param lang          if need all results must be filtered by lang_id, not all multi language tablas have lang_is, for example table field
     * @param parameters    when overwrite loadDadaTableLazy function, is to add more parametes, for example field_value table need add field id
     */
    loadDadaTableLazy(event: LazyLoadEvent, f: Function, lang: string = undefined, params: Object[] = undefined) {

        if (params === undefined) {
            params = []; // create empty array
        }

        params.push({
                'command': 'limit',
                'value': event.rows
            });

        params.push({
                'command': 'offset',
                'value': event.first
            });

        // set commands to orderBy
        if (event.sortField) {
            params.push({
                    'command': 'orderBy',
                    'operator': event.sortOrder === 1 ? 'asc' : 'desc', // asc | desc
                    'column': event.sortField
                });
        }

        // set commands to filter
        if (event.globalFilter) {
            for (const column of this.columnsSearch) {
                params.push({
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
                'parameters': params
            })
            .subscribe((response) => {
                this.totalRecords = response.total;
                this.filteredRecords = response.filtered;
                f(response.data);
            });
    }

    deleteRecord(f: Function, object: any, params = []): void {

        params.push(object.id);

        if (object.lang_id) {   // check if has languages
            params.push(object.lang_id);
        }

        // confirm to delete object
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete this object?',
            accept: () => {
                this.objectService
                    .deleteRecord(params)
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
