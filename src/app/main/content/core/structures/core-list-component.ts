import { Injector, ViewChild, AfterViewInit, ElementRef, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { of as observableOf } from 'rxjs/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import { CoreComponent } from './core-component';
import { GraphQLSchema } from './graphql-schema';

export abstract class CoreListComponent extends CoreComponent implements AfterViewInit, OnInit
{
    startTable = new Subject();                 // Create Observable to start table
    refreshTable = new Subject();               // Create Observable to unsubscribe
    objects: any[] = [];                        // property that can to be overwrite in child class
    totalRecords: number;                       // total records in datatable
    filteredRecords: number;                    // filtered records over total
    columnsSearch: string[];                    // columns where will be used for global searchs
    displayedColumns: string[];                 // columns will be displayed
    dataSource = new MatTableDataSource();      // data content to material data table
    resultsLength = 0;                          // total results
    isLoadingResults = true;                    // flag to know if data is loading
    filters: any[];
    
    // view data table components
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('filter') filter: ElementRef;

    constructor(
        protected injector: Injector,
        protected graphQL: GraphQLSchema
    ) {
        super(injector, graphQL);
    }

    ngOnInit() 
    {
        super.ngOnInit();
        
        // get model reference to get search text
        this.filter.nativeElement.value = localStorage.getItem(this.graphQL.model);
    }

    ngAfterViewInit() 
    {
        // If the user changes the sort order or filter by text, reset back to the first page.
        merge(
            this.sort.sortChange,
            Observable.
                fromEvent(this.filter.nativeElement, 'keyup')
                .debounceTime(500)
                .distinctUntilChanged()
        )
        .takeUntil(this.ngUnsubscribe)
        .subscribe(() => this.paginator.pageIndex = 0);

        merge(
            this.startTable.debounceTime(800),
            this.refreshTable,
            this.sort.sortChange.debounceTime(400), 
            this.paginator.page, 
            Observable
                .fromEvent(this.filter.nativeElement, 'keyup')
                .debounceTime(400)
                .distinctUntilChanged()
        )
        .pipe(
            // comment startWith({}) to start table with "this.startTable.debounceTime(300)" to avoid overwirtes tokens from JWT
            // startWith({}), 
            switchMap(() => {
                this.isLoadingResults = true;
 
                // throw a new obserbable
                return this.getRecords(
                    this.sort.active, 
                    this.sort.direction, 
                    this.paginator.pageIndex * this.paginator.pageSize,
                    this.paginator.pageSize,
                    this.filter.nativeElement.value
                );
            }),
            map(data => {
                return data['data'];
            })
        )
        .takeUntil(this.ngUnsubscribe)
        .subscribe(data => {
            if (this.env.debug) console.log('DEBUG - Data from Query Objects Pagination: ', data);
            
            // set number of results
            this.resultsLength = data['coreObjectsPagination']['filtered'];
            
            // set relations data
            this.setRelationsData(data);

            // set data source
            this.dataSource.data = data['coreObjectsPagination']['objects'];
            
            // hide loader data table
            this.isLoadingResults = false;
        });

        this.startTable.next();
    }

    /*
    * Clear input search
    */
    clearFilter() 
    {
        this.filter.nativeElement.value = '';
        this.refreshTable.next();
    }

    /**
     * getRecords method
     *
     * @param sort      colum name that will be sorted
     * @param order     type of sort, asc or desc
     * @param offset    current page number
     * @param limit     number of records to take
     */
    getRecords(sort: string, order: string, offset: number, limit: number, searchText: string) 
    {
        // set params
        const args = this.argumentsGetRecords(sort, order, offset, limit, searchText);

        if (this.env.debug) console.log('DEBUG - Args pass to Query Objects Pagination: ', args);

        return this.httpService
            .apolloClient()
            .watchQuery({
                fetchPolicy: 'network-only',
                query: this.graphQL.queryPaginationObject,
                variables: args
            })
            .valueChanges;
    }

    argumentsGetRecords(sort: string, order: string, offset: number, limit: number, searchText: string): Object 
    {
        const args = {}; // create empty object

        // set filters
        if (this.filters) args['filters'] = this.filters;

        // set sql
        args['sql'] = [];

        // set limit sql
        args['sql'].push({
                command: 'limit',
                value: limit
            });

        // set offset sql
        args['sql'].push({
                command: 'offset',
                value: offset
            });

        // set orderBy sql
        if (sort) 
        {
            args['sql'].push({
                    command: 'orderBy',
                    operator: order ? order : 'asc',
                    column: sort
                });
        }

        // set search by text
        if (searchText) 
        {
            // set search text
            localStorage.setItem(this.graphQL.model, searchText);

            for (const column of this.columnsSearch) 
            {
                 args['sql'].push({
                    command: 'orWhere',
                    column: column,
                    operator: 'like',
                    value: `%${searchText}%`
                });
            }
        }
        else
        {
            localStorage.removeItem(this.graphQL.model);
        }

        return this.getCustomArgumentsGetRecords(args);
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
    setData (data): void 
    {
        this.objects = data;
    }

    // instante custom arguments, for example in article-list.component.ts
    getCustomArgumentsGetRecords(args: Object): Object 
    {
        return args;
    }
}
