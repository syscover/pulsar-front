import { CoreComponent } from './core.component';
import { CoreService } from './core.service';
import { Injector, ViewChild, HostBinding } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LazyLoadEvent, ConfirmationService, DataTable } from 'primeng/primeng';

// plantear como servicio

export class CoreListComponent extends CoreComponent {

    @HostBinding('class') classes = 'animated fadeIn';
    @ViewChild(('dataTableObjects')) dataTable: DataTable;

    objects: any[] = [];        // property that can to be overwrite in child class
    totalRecords: number;       // total records in datatable
    filteredRecords: number;    // filtered records over total
    columnsSearch: string[];    // columns where will be used for global searchs
    // Function that can to be overwrite in child class
    customCallback: Function = data => this.objects = data;

    constructor(
        protected injector: Injector,
        protected objectService: CoreService
    ) {
        super(injector, objectService);
    }

    getRecords(f: Function): void {
        this.objectService
            .getRecords()
            .subscribe((response: any) => {
                this.customCallback(response.data);
            });
    }

    /**
     * loadDadaTableLazy method
     *
     * @param event
     * @param lang          if need all results must be filtered by lang_id, not all multi language tablas have lang_is, for example table field
     * @param parameters    when overwrite loadDadaTableLazy function, is to add more parametes, for example field_value table need add field id
     */
    loadDadaTableLazy(event: LazyLoadEvent, lang: string = undefined, params: Object[] = undefined) {

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

                // instance data on object list
                this.customCallback(response.data);
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
