import { CoreComponent } from './core.component';
import { CoreService } from './core.service';
import { Injector, ViewChild, HostBinding } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { LazyLoadEvent, ConfirmationService, DataTable } from 'primeng/primeng';

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
     * loadDadaTableLazy method over GraphQL
     *
     * @param event
     * @param lang          if need all results must be filtered by lang_id, not all multi language tablas have lang_is, for example table field
     * @param params        when overwrite loadDadaTableLazy function, is to add more parametes, for example field_value table need add field id
     */
    loadDadaTableLazyGraphQL(event: LazyLoadEvent, lang: string = undefined, sql: Object[] = undefined) {

        // set params
        let args = this.setArgs(event, lang, sql);
        args['lang'] = lang;

        this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.grahpQL.queryObjects,
                variables: args,
                fetchPolicy: 'network-only'
            }).subscribe(({data}) => {

                // paginaton data
                this.totalRecords = data[this.grahpQL.paginationContainer].total;
                this.filteredRecords = data[this.grahpQL.paginationContainer].filtered;

                // instance data on object list
                this.customCallback(data[this.grahpQL.paginationContainer][this.grahpQL.objectsContainer]);
            });
    }

    /**
     * loadDadaTableLazy method
     *
     * @param event
     * @param lang          if need all results must be filtered by lang_id, not all multi language tablas have lang_is, for example table field
     * @param parameters    when overwrite loadDadaTableLazy function, is to add more parametes, for example field_value table need add field id
     */
    loadDadaTableLazy(event: LazyLoadEvent, lang: string = undefined, sql: Object[] = undefined) {

        // set params
        let args = this.setArgs(event, lang, sql);
        args['lang'] = lang;

        // search elements by paramenters
        this.objectService
            .searchRecords(args)
            .subscribe((response) => {
                this.totalRecords = response.total;
                this.filteredRecords = response.filtered;

                // instance data on object list
                this.customCallback(response.data);
            });
    }

    deleteRecord(f: Function, object: any, args = {}): void {

        // set arguments to delete object
        args['id'] = object.id;
        if (object.lang_id) {   // check if has languages
            args['lang_id'] = object.lang_id;
        }

        // confirm to delete object
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete this object?',
            accept: () => {

                this.objectService
                    .proxyGraphQL()
                    .mutate({
                        mutation: this.grahpQL.mutationDeleteObject,
                        variables: args
                    }).subscribe((response) => {
                        // delete object and call onLazyLoad event on datatable
                        // to reload data
                        this.dataTable.onLazyLoad.emit(
                            this.dataTable.createLazyLoadMetadata()
                        );
                    });
            }
        });
    }

    private setArgs(event: LazyLoadEvent, lang: string = undefined, sql: Object[] = undefined): Object {

        let args = {}; // create empty object
        args['sql'] = sql ? sql : []; // set sql array

        // set limit sql
        args['sql'].push({
                command: 'limit',
                value: event.rows
            });

        // set offset sql
        args['sql'].push({
                command: 'offset',
                value: event.first
            });

        // set orderBy sql
        if (event.sortField) {
            args['sql'].push({
                    command: 'orderBy',
                    operator: event.sortOrder === 1 ? 'asc' : 'desc', // asc | desc
                    column: event.sortField
                });
        }

        // set global filter sql
        if (event.globalFilter) {
            for (const column of this.columnsSearch) {
                 args['sql'].push({
                    command: 'orWhere',
                    column: column,
                    operator: 'like',
                    value: `%${event.globalFilter}%`
                });
            }
        }

        return args;
    }
}
