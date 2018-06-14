import {Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import {merge} from 'rxjs/observable/merge';
import {switchMap} from 'rxjs/operators/switchMap';
import {Observable} from 'rxjs/Observable';
import {first} from 'rxjs/operators/first';
import {startWith} from 'rxjs/operators/startWith';

@Component({
    selector: 'dh2-search-list',
    template: `
        <div class="search-input-wrapper mx-12 m-md-0" fxFlex="1 0 auto" fxLayout="row" fxLayoutAlign="start center">
            <label for="filter" class="mr-8">
                <mat-icon class="secondary-text">search</mat-icon>
            </label>
            <mat-form-field floatLabel="never" fxFlex="1 0 auto" class="search-form-field">
                <input #filter id="filter" matInput placeholder="placeholder">
                <button mat-button mat-icon-button matSuffix class="filter-close-icon" *ngIf="filter?.value" (click)="clearFilter()">
                    <mat-icon>close</mat-icon>
                </button>
            </mat-form-field>
        </div>
    `,
})

export class SearchListComponent implements OnInit
{
    // se ha intentado encapsular el conmponente de búsqueda, pero hay que enlazarlo con todos los observables
    constructor() {}

    @Input() placeholder: string;

    @ViewChild('filter') filter: ElementRef;
    refreshTable = new Subject();               // Create Observable to unsubscribe

    private registerSubscriptions = async () => {
        // If the user changes the sort order or filter by text, reset back to the first page.
        // merge(
        //     Observable.
        //     fromEvent(this.filter.nativeElement, 'keyup')
        //         .debounceTime(500)
        //         .distinctUntilChanged()
        // )
        //     .takeUntil(this.ngUnsubscribe)
        //     .subscribe(() => this.paginator.pageIndex = 0);
        //
        // merge(
        //     this.refreshTable,
        //     Observable
        //         .fromEvent(this.filter.nativeElement, 'keyup')
        //         .debounceTime(400)
        //         .distinctUntilChanged()
        // )
        //     .pipe(
        //         switchMap(async () => {
        //             await this.loadDataSource();
        //         })
        //     )
        //     .takeUntil(this.ngUnsubscribe)
        //     .subscribe(() => {
        //         // this response is asynchronous, fron this section can't recover response data from promise
        //     });
        //
        // await this.startTable
        //     .pipe(
        //         startWith({}),
        //         switchMap(async () => {
        //             await this.loadDataSource();
        //         }),
        //         first()
        //     )
        //     .toPromise();
    }

    ngOnInit() { }

    clearFilter()
    {
        this.filter.nativeElement.value = '';
        this.refreshTable.next();
    }
}
