import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataTable } from 'primeng/primeng';

@Component({
    selector: 'ps-datatable-search',
    templateUrl: './datatable-search.component.html',
    styles: [`
        .fa-search{
            margin:3px 0 0 0
        }
    `]
})
export class DatatableSearchComponent implements OnInit {

    @Input() dataTable: DataTable;
    @Input() label: string;
    @Output() onSearch: EventEmitter<any> = new EventEmitter();
    protected delayInstance: any;
    protected term = ''; // global term to search it

    constructor() { }

    ngOnInit() { }

    searchData(event) {
        if (this.delayInstance) {
            clearTimeout(this.delayInstance);
        }

        this.delayInstance = setTimeout(() => {

            if (! this.dataTable.globalFilter) {
                // set dataTable.globalFilter after ngAfterViewInit to avoid register "keyup" event listener on datatable, view line 756
                 // https://github.com/primefaces/primeng/blob/master/components/datatable/datatable.ts
                this.dataTable.globalFilter = this;
            }

            const metadata = this.dataTable.createLazyLoadMetadata();

            this.dataTable.stopFilterPropagation = true; // stop call DataTable._filter() in ngDoCheck() hook
            this.dataTable.onLazyLoad.emit(
                this.dataTable.createLazyLoadMetadata()
            );

            // function to do custom actions
            this.onSearch.emit(metadata);
        }, 500);
    }

    // set get method for datatable component can get value
    get value(){
        return this.term;
    }

}
