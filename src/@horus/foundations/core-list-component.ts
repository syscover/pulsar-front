import { Injector, ViewChild, AfterViewInit, AfterContentInit, ElementRef, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { HttpSynchronousService } from '@horus/services/http-synchronous.service';
import { CoreComponent } from '@horus/foundations/core-component';
import { first, switchMap, startWith, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject, from, merge, fromEvent } from 'rxjs';
import * as _ from 'lodash';

export abstract class CoreListComponent extends CoreComponent implements AfterViewInit, AfterContentInit, OnInit
{
    startTable = new Subject();                 // Create Observable to start table
    refreshTable = new Subject();               // Create Observable to unsubscribe
    objects: any[] = [];                        // property that can to be overwrite in child class
    totalRecords: number;                       // total records in datatable
    filteredRecords: number;                    // filtered records over total
    columnsPattern: object;                     // Columns patter to know all possible columns to show
    columnsSearch: string[];                    // columns where will be used for global searches
    displayedColumns: string[];                 // columns will be displayed
    dataSource = new MatTableDataSource();      // data content to material data table
    resultsLength = 0;                          // total results
    isLoadingResults = true;                    // flag to know if data is loading
    filters: any[] = [];                        // filters to data table
    
    // view data table components
    @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
    @ViewChild(MatSort, {static: false}) sort: MatSort;
    @ViewChild('filter', {static: false}) filter: ElementRef;

    private httpSynchronousService: HttpSynchronousService;
    private running = false; // boolean true when is consulting through Http
    private buffer: any;
    private registerSubscriptions = async () =>
    {
        // compose source events to get pagination values
        const sourceFilterEvents: any[] = [this.refreshTable, this.sort.sortChange, this.paginator.page];

        if (this.filter)
        {
            // If the user changes the sort order or filter by text, reset back to the first page.
            merge(
                this.sort.sortChange,
                fromEvent(this.filter.nativeElement, 'keyup')
                    .pipe(
                        debounceTime(500),
                        distinctUntilChanged()
                    )
            ).pipe(
                takeUntil(this.$onDestroy)
            ).subscribe(() => this.paginator.pageIndex = 0);

            // if exist global filter add from event rxjs function
            sourceFilterEvents.push(
                fromEvent(this.filter.nativeElement, 'keyup')
                    .pipe(
                        debounceTime(400),
                        distinctUntilChanged()
                    )
            );
        }

        // use propagation operator to send parameters
        merge(...sourceFilterEvents).pipe(
            switchMap(async () =>
            {
                await this.loadDataSource();
            }),
            takeUntil(this.$onDestroy)
        ).subscribe(() =>
        {
            // this response is asynchronous, from this section can't recover response data from promise
        });

        await this.startTable
            .pipe(
                startWith({}),
                switchMap(async () =>
                {
                    await this.loadDataSource();
                }),
                first()
            )
            .toPromise();
    }

    private loadDataSource = async () => 
    {
        const parameters = {
            sort: this.sort.active,
            order: this.sort.direction,
            offset: this.paginator.pageIndex * this.paginator.pageSize,
            limit: this.paginator.pageSize,
            searchText: this.filter.nativeElement.value
        };
        
        // check if there ara value and there isn't a request in progress
        if (! this.running)
        {
            this.isLoadingResults = true; // flag to show loading shape
            this.running = true;
            let data;

            data = await this.getRecords(
                parameters.sort,
                parameters.order,
                parameters.offset,
                parameters.limit,
                parameters.searchText
            );

            // check buffer
            while (this.buffer)
            {
                data = await this.getRecords(
                    this.buffer.sort,
                    this.buffer.order,
                    this.buffer.offset,
                    this.buffer.limit,
                    this.buffer.searchText
                );
                // reset buffer
                this.buffer = undefined;
            }
            this.running = false;

            if (this.env.debug) console.log('DEBUG - Data from Query Objects Pagination: ', data.data);

            // set number of results
            this.resultsLength = data.data.coreObjectsPagination.filtered;

            // set relations data
            this.setRelationsData(data.data);

            // set data source
            this.dataSource.data = data.data.coreObjectsPagination.objects;

            // set data source
            this.setDataSource(data.data.coreObjectsPagination.objects);

            // hide loader data table
            this.isLoadingResults = false;
        }
        else if (this.isLoadingResults)
        {
            // add event tu buffer
            this.buffer = parameters;
            return from([]);
        }
    }

    constructor(
        protected injector: Injector,
        protected graphQL: any
    )
    {
        super(injector, graphQL);

        // get Http Organizer, to avoid overwrite token in request
        this.httpSynchronousService = this.injector.get(HttpSynchronousService);


    }

    setTableColumns(): void
    {
        if (this.columnsPattern && this.columnsPattern instanceof Object)
        {
            // reset displayed columns
            this.displayedColumns = [];

            for (const column in this.columnsPattern)
            {
                if (column)
                {
                    if (this.columnsPattern[column]) this.displayedColumns.push(column);
                }
            }

            this.displayedColumns.push('actions');
        }
    }

    ngAfterContentInit (): void
    {
        // set table columns
        this.setTableColumns();
    }

    ngAfterViewInit(): void
    {
        if (this.dataRoute.action === 'list')
        {
            // init data table with async data
            this.initDataTable();
        }
    }

    ngOnInit(): void
    {
        super.ngOnInit();
        if (this.dataRoute.action === 'list' && this.filter)
        {
            // get model reference to get search text
            this.filter.nativeElement.value = localStorage.getItem(this.graphQL.model);
        }
    }

    async initDataTable()
    {
        if (this.httpSynchronousService.running) 
        {
            this.httpSynchronousService.buffer = this.registerSubscriptions;
        }
        else
        {
            this.httpSynchronousService.running = true;
            await this.registerSubscriptions();
            this.httpSynchronousService.running = false;
        }
    }

    /*
    * Clear common text input search
    */
    clearFilter(): void
    {
        this.filter.nativeElement.value = '';
        this.refreshTable.next();
    }

    /*
    * Clear filter or ser filter of column
    */
    setColumnFilter($event): void
    {
        if (Array.isArray(this.filters)) _.remove(this.filters, {'column': $event.column});

        // check if have to clear filter
        if ($event.value === undefined && $event.operator === undefined)
        {
            if (this.env.debug) console.log('DEBUG - Clear filter to filters array: ', $event);
            this.filter.nativeElement.value = '';
        }
        else
        {
            if (this.env.debug) console.log('DEBUG - Apply filter to filters array: ', $event);
            this.filters.push({
                'command': 'where',
                'column': $event.column,
                'operator': $event.operator,
                'value': $event.value
            });
        }
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
    async getRecords(sort: string, order: string, offset: number, limit: number, searchText: string) 
    {
        // set params
        const args = this.horusConfig.graphQLMock ? {} : this.argumentsGetRecords(sort, order, offset, limit, searchText);

        if (this.env.debug) console.log('DEBUG - Args pass to Query Objects Pagination: ', args);

        return await this.http
            .apolloClient()
            .watchQuery({
                query: this.graphQL.queryPaginationObject,
                variables: this.horusConfig.graphQLMock ? {} : args
            })
            .valueChanges
            .pipe(
                first()
            )
            .toPromise();
    }

    argumentsGetRecords(sort: string, order: string, offset: number, limit: number, searchText: string): object
    {
        const args: any = {}; // create empty object

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
     * Set data for relations object
     * @param data
     */
    setRelationsData(data: object): void { }

    /**
     * Set data source
     * @param data
     */
    setDataSource(data: object): void { }

    /**
     *
     * @param data
     */
    setData (data): void 
    {
        this.objects = data;
    }

    // instante custom arguments, for example in article-list.component.ts
    getCustomArgumentsGetRecords(args: object): object
    {
        return args;
    }
}
