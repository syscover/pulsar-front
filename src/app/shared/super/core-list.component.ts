import { CoreComponent } from './core.component';
import { GraphQLModel } from './../../core/graphql/graphql-model.class';
import { Injector, ViewChild, HostBinding, OnInit } from '@angular/core';
import { LazyLoadEvent, DataTable } from 'primeng/primeng';
import { environment } from './../../../environments/environment';

export class CoreListComponent extends CoreComponent implements OnInit {

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
        protected graphQL: GraphQLModel
    ) {
        super(injector, graphQL);
    }

    ngOnInit() {
        this.getGraphQLDataRelationsToCreateObject();
    }

    getRecords(f: Function): void {
        this.objectService
            .getRecords()
            .subscribe((response: any) => {
                this.customCallback(response.data);
            });
    }

    // to create a new object, do all queries to get data across GraphQL
    getGraphQLDataRelationsToCreateObject() { }

     // create all elements whith graphQL data obtain from method getGraphQLDataRelationsToCreateObject()
    setDataRelationsObject(data: any) { }

    /**
     * loadDadaTableLazy method over GraphQL
     *
     * @param event
     * @param lang          if need all results must be filtered by lang_id, not all multi language tablas have lang_is, for example table field
     * @param params        when overwrite loadDadaTableLazy function, is to add more parametes, for example field_value table need add field id
     */
    loadDadaTableLazyGraphQL(event: LazyLoadEvent, filters: Object[] = undefined, sql: Object[] = undefined) {

        // set params
        let args = this.getArgsToGetRecords(event, filters, sql);

        if(environment.debug) console.log('DEBUG - Arguments pass to Query Objects Pagination: ', args);

        let obs = this.objectService
            .proxyGraphQL()
            .watchQuery({
                query: this.graphQL.queryPaginationObject,
                variables: args,
                fetchPolicy: 'network-only'
            }).subscribe(({data}) => {

                obs.unsubscribe();

                if(environment.debug) console.log('DEBUG - data from Query Objects Pagination: ', data);

                // paginaton data
                this.totalRecords = data['coreObjectsPagination'].total;
                this.filteredRecords = data['coreObjectsPagination'].filtered;

                // instance data on object list
                this.customCallback(data['coreObjectsPagination']['objects']);
            }, (error) => {
                console.log('DEBUG - Error GraphQL response in data list: ', error);
                //this.router.navigate(['/pulsar/login']);
            });
    }

    /**
     * loadDadaTableLazy method
     *
     * @param event
     * @param lang          if need all results must be filtered by lang_id, not all multi language tablas have lang_is, for example table field
     * @param parameters    when overwrite loadDadaTableLazy function, is to add more parametes, for example field_value table need add field id
     */
    /*loadDadaTableLazy(event: LazyLoadEvent, lang: string = undefined, sql: Object[] = undefined) {

        // set params
        let args = this.getArgsToGetRecords(event, lang, sql);

        // search elements by paramenters
        this.objectService
            .searchRecords(args)
            .subscribe((response) => {
                this.totalRecords = response.total;
                this.filteredRecords = response.filtered;

                // instance data on object list
                this.customCallback(response.data);
            });
    }*/

    deleteRecord(f: Function, object: any, args = {}): void {

        // set arguments to delete object
        args['id'] = object.id;
        if (object.lang_id) {   // check if has languages
            args['lang'] = object.lang_id;
        }

        if(environment.debug) console.log('DEBUG - args sending to delete object: ', args);

        // confirm to delete object
        this.confirmationService.confirm({
            message: 'Are you sure that you want delete this object?',
            accept: () => {

                this.objectService
                    .proxyGraphQL()
                    .mutate({
                        mutation: this.graphQL.mutationDeleteObject,
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

    private getArgsToGetRecords(event: LazyLoadEvent, filters: Object[] = undefined, sql: Object[] = undefined): Object {

        let args = {}; // create empty object

        // set filters
        if (filters) {
            args['filters'] = filters;
        }

        /*// set lang if is defined
        if (lang) {
            args['lang'] = lang;
        }*/

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
