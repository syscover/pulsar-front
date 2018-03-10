import { Injector, ViewChild, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { merge } from 'rxjs/observable/merge';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { of as observableOf } from 'rxjs/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/takeUntil';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CoreComponent } from './core-component';
import { GraphQLSchema } from './graphql-schema';

export abstract class CoreListComponent extends CoreComponent implements AfterViewInit, OnDestroy
{
    protected ngUnsubscribe = new Subject();    // Create Observable to unsubscribe
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

    ngOnDestroy() 
    {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        if (this.env.debug) console.log('DEBUG - Core list component destroyed');
    }

    ngAfterViewInit() 
    {
        this.filter.nativeElement.value = localStorage.getItem(this.graphQL.model);

        // If the user changes the sort order or filter by text, reset back to the first page.
        merge(
            this.sort.sortChange,
            Observable.
                fromEvent(this.filter.nativeElement, 'keyup')
                .debounceTime(300)
                .distinctUntilChanged()
        )
        .takeUntil(this.ngUnsubscribe)
        .subscribe(() => this.paginator.pageIndex = 0);

        merge(
            this.sort.sortChange, 
            this.paginator.page, 
            Observable
                .fromEvent(this.filter.nativeElement, 'keyup')
                .debounceTime(300)
                .distinctUntilChanged()
            )
            .pipe(
                startWith({}),
                switchMap(() => {
                    this.isLoadingResults = true;

                    console.log('busqueda', this.filter.nativeElement.value);

                    return this.getRecords(
                        this.sort.active, 
                        this.sort.direction, 
                        this.paginator.pageIndex * this.paginator.pageSize,
                        this.paginator.pageSize,
                        this.filter.nativeElement.value
                    );
                }),
                map(data => {
                    this.isLoadingResults = false;
                    this.resultsLength = data['data']['coreObjectsPagination']['filtered'];

                    return data['data']['coreObjectsPagination']['objects'];
                }),
                catchError((error) => {
                    console.log('DEBUG - Error GraphQL response in data list: ', error);
                    this.isLoadingResults = false;
                    return observableOf([]);
                })
            )
            .takeUntil(this.ngUnsubscribe)
            .subscribe(data => {
                if (this.env.debug) console.log('DEBUG - Data from Query Objects Pagination: ', data);
                this.dataSource.data = data;
            });
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
