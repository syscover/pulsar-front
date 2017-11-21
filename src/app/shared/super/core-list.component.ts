import { CoreComponent } from './core.component';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import { Injector, ViewChild, HostBinding, OnInit } from '@angular/core';
import { LazyLoadEvent, DataTable } from 'primeng/primeng';
import { environment } from './../../../environments/environment';

export class CoreListComponent extends CoreComponent {

    @HostBinding('class') classes = 'animated fadeIn';

    objects: any[] = [];        // property that can to be overwrite in child class
    totalRecords: number;       // total records in datatable
    filteredRecords: number;    // filtered records over total
    columnsSearch: string[];    // columns where will be used for global searchs

    constructor(
        protected injector: Injector,
        protected graphQL: GraphQLModel
    ) {
        super(injector, graphQL);
    }

    /**
     * loadDadaTableLazy method over GraphQL
     *
     * @param event
     * @param lang          if need all results must be filtered by lang_id, not all multi language tablas have lang_is, for example table field
     * @param params        when overwrite loadDadaTableLazy function, is to add more parametes, for example field_value table need add field id
     */
    getRecords(event: LazyLoadEvent, filters: Object[] = undefined, sql: Object[] = undefined) {
        // set params
        let args = this.argumentsGetRecords(event, filters, sql);

        if (environment.debug) console.log('DEBUG - Args pass to Query Objects Pagination: ', args);

        let obs = this.objectService
            .proxyGraphQL()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: this.graphQL.queryPaginationObject,
                variables: args
            }).subscribe(({data}) => {

                obs.unsubscribe();

                if (environment.debug) console.log('DEBUG - Data from Query Objects Pagination: ', data);

                // paginaton data
                this.totalRecords = data['coreObjectsPagination'].total;
                this.filteredRecords = data['coreObjectsPagination'].filtered;

                // set realtions data
                this.setRelationsData(data);

                // instance data on object list
                this.setData(data['coreObjectsPagination']['objects']);
            }, (error) => {
                if (environment.debug) {
                    console.log('DEBUG - Error GraphQL response in data list: ', error);
                } else {
                    this.router.navigate(['/pulsar/login']);
                }
            });
    }

    /**
     * Set data for realations object
     * @param data
     */
    setRelationsData(data: Object): void { }

    /**
     *
     * @param data
     */
    setData (data): void {
        this.objects = data;
    }

    argumentsGetRecords(event: LazyLoadEvent, filters: Object[] = undefined, sql: Object[] = undefined): Object {

        let args = {}; // create empty object

        // set filters
        if (filters) {
            args['filters'] = filters;
        }

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

        return this.getCustomArgumentsGetRecords(args);
    }

    // instante custom arguments, for example in article-list.component.ts
    getCustomArgumentsGetRecords(args: Object): Object {
        return args;
    }
}
