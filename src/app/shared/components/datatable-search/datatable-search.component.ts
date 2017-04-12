import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DataTable } from 'primeng/primeng';

@Component({
    selector: 'ps-datatable-search',
    templateUrl: './datatable-search.component.html',
    styleUrls: ['./datatable-search.component.css']
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
            let metadata = this.dataTable.createLazyLoadMetadata();
            metadata.globalFilter = this.term;
            this.dataTable.onLazyLoad.emit(metadata);

            // function to do custom actions
            this.onSearch.emit(metadata);
        }, 500);
    }

}
